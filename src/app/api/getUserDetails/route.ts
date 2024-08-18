import { prisma } from "@/app/lib/prisma";
import { apiResponse } from "@/app/utils/helpers/apiResponse";

export interface GetUserApiBodyProps {
    userId: string
}

export async function POST(req: Request) {
    const body: GetUserApiBodyProps = await req.json();
    const { userId } = body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
        })
        return apiResponse({ user: user! }, 200)
    } catch (error) {
        console.log(error)
        return apiResponse({ message: "Error" }, 500)
    }
}