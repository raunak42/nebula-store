import { generateState, generateCodeVerifier } from "arctic";
import { getGoogleAuth } from "@/auth";
import { cookies } from "next/headers";

export async function GET(request: Request): Promise<Response> {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
    ];

    const google = getGoogleAuth(new URL(request.url).origin);
    const url = await google.createAuthorizationURL(state, codeVerifier, { scopes });

    cookies().set("google_oauth_state", state, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax"
    });

    cookies().set("google_oauth_codeVerifier", codeVerifier, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax"
    })

    return Response.redirect(url);
}