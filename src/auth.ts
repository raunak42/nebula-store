import { Lucia, Session, User } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "./app/lib/prisma";
import { cookies } from "next/headers";
import { Google } from "arctic";

const normalizeOrigin = (origin: string) => origin.replace(/\/$/, "");

const getAuthOrigin = (origin?: string) => {
    if (origin) return normalizeOrigin(origin);

    if (process.env.AUTH_URL) return normalizeOrigin(process.env.AUTH_URL);
    if (process.env.NEXT_PUBLIC_APP_URL) return normalizeOrigin(process.env.NEXT_PUBLIC_APP_URL);

    if (process.env.VERCEL_URL) {
        const protocol = process.env.VERCEL_ENV === "development" ? "http" : "https";
        return `${protocol}://${normalizeOrigin(process.env.VERCEL_URL)}`;
    }

    return "http://localhost:3000";
};

export const getGoogleAuth = (origin?: string) => {
    const redirectURI = `${getAuthOrigin(origin)}/login/google/callback`;
    return new Google(process.env.GOOGLE_CLIENT_ID!, process.env.GOOGLE_CLIENT_SECRET!, redirectURI);
};

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes: (attributes) => {
        return {
            // attributes has the type of DatabaseUserAttributes
            providerId: attributes.providerId,
            username: attributes.username
        };
    }
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
    interface DatabaseUserAttributes {
        providerId: string;
        username: string;
    }
}

export const validateRequest = async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
        return {
            user: null,
            session: null
        };
    }

    let result: {
        user: User;
        session: Session;
    } | {
        user: null;
        session: null;
    } = {
        user: null,
        session: null
    }
    // next.js throws when you attempt to set cookie when rendering page
    try {
        result = await lucia.validateSession(sessionId);
        if (result.session && result.session.fresh) {
            const sessionCookie = lucia.createSessionCookie(result.session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        if (!result.session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    } catch (error) {
        console.error(error)
    }
    return result;
}

export const getUser = async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return null;
    const { user, session } = await lucia.validateSession(sessionId);
    try {
        if (session && session.fresh) {
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        if (!session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    } catch (error) {
        console.error(error)
        // Next.js throws error when attempting to set cookies when rendering page
    }
    return user;
}
