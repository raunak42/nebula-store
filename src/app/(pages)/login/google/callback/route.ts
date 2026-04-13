import { getGoogleAuth, lucia } from "@/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { prisma } from "@/app/lib/prisma";


export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const storedState = cookies().get("google_oauth_state")?.value ?? null;
    const codeVerifier = cookies().get("google_oauth_codeVerifier")?.value ?? null;

    if (!code || !state || !storedState || !codeVerifier || state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }

    try {
        const google = getGoogleAuth(url.origin);
        const tokens = await google.validateAuthorizationCode(code, codeVerifier);
        const googleUserResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });

        if (!googleUserResponse.ok) {
            return new Response(null, {
                status: 502
            });
        }

        const googleUser: GoogleUser = await googleUserResponse.json();

        const existingUser = await prisma.oAuthAccount.findUnique({
            where: {
                providerId: "google",
                providerUserId: parseFloat(googleUser.id)
            }
        })

        if (existingUser) {
            const session = await lucia.createSession(existingUser.user_id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            cookies().delete("google_oauth_state");
            cookies().delete("google_oauth_codeVerifier");
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/"
                }
            });
        }

        const userId = generateId(15);

        await prisma.user.create({
            data: {
                id: userId,
                username: googleUser.name,
                email: googleUser.email,
                avatar: googleUser.picture
            }
        });

        await prisma.oAuthAccount.create({
            data: {
                providerId: "google",
                providerUserId: parseFloat(googleUser.id),
                user_id: userId
            }
        })

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        cookies().delete("google_oauth_state");
        cookies().delete("google_oauth_codeVerifier");
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        });
    } catch (e) {
        cookies().delete("google_oauth_state");
        cookies().delete("google_oauth_codeVerifier");
        console.error(e)
        if (e instanceof OAuth2RequestError) {
            return new Response(null, {
                status: 400
            });
        }
        return new Response(null, {
            status: 500
        });
    }
}

interface GoogleUser {
    id: string;
    sub: string;
    login: string;
    name: string;
    email: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}


