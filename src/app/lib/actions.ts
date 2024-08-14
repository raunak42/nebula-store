"use server"
import { lucia } from "@/auth";
import { prisma } from "./prisma";
import { products } from "./products";
import { pixelAvatars } from "./randomAvatars";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateId } from "lucia";
import bcrypt from "bcryptjs";
import { emailInput, passwordInput } from "./zod";


export const populateDb = async () => {
    await prisma.product.createMany({
        data: products
    })
}

export const getRandomAvatar = async () => {
    const randomIndex = pixelAvatars.length
    const randomAvatar =
        pixelAvatars[Math.floor(Math.random() * randomIndex)];

    return randomAvatar;
}

export const checkUserInDb = async (email: string) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    return existingUser;
}

export const signupAndStartSession = async (formData: FormData) => {
    const email = formData.get("email")
    const password = formData.get("password")

    if (!email || !password) {
        return;
    }

    const parsedEmail = emailInput.safeParse(email);
    const parsedPassword = passwordInput.safeParse(password);

    if (parsedPassword.error || parsedEmail.error) {
        return; //The function will stop here, but AuthCard also has the same zod validations. So AuthCard will continue to display alerts even if this function returns. Hence you don't need to transfer any info/warning from here to the dom.
    }

    const hashedPassword = await bcrypt.hash(parsedPassword.data, 10);
    const existingUser = await checkUserInDb(parsedEmail.data);

    if (existingUser) {
        console.log("Email already exists.");
        return;
    }

    const randomAvatar = await getRandomAvatar();
    const userId = generateId(15);
    const username = parsedEmail.data.split("@")[0]

    await prisma.user.create({
        data: {
            id: userId,
            email: parsedEmail.data,
            hashed_password: hashedPassword,
            avatar: randomAvatar,
            username: username
        }
    });

    await startSession(userId)

}

export const loginAndStartSession = async (formData: FormData) => {
    const email = formData.get("email")
    const password = formData.get("password")

    if (!email || !password) {
        return;
    }

    const parsedEmail = emailInput.safeParse(email);
    const parsedPassword = passwordInput.safeParse(password);

    if (parsedPassword.error || parsedEmail.error) {
        return; //The function will stop here, but AuthCard also has the same zod validations. So AuthCard will continue to display alerts even if this function returns. Hence you don't need to transfer any info/warning from here to the dom.
    }
    const existingUser = await checkUserInDb(parsedEmail.data);

    if (!existingUser) {
        console.log("User doesnt exist.");
        return;
    }

    const verifiedPassword = await bcrypt.compare(parsedPassword.data, existingUser.hashed_password);
    if (!verifiedPassword) {
        console.log("Invalid username or password.");
        return;
    }

    await startSession(existingUser.id)
}

export const startSession = async (userId: string) => {
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set("auth_session", sessionCookie.value, sessionCookie.attributes);
    return redirect("/home");
}