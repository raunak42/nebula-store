import { prisma } from "@/app/lib/prisma";
import { apiResponse } from "@/app/utils/helpers/apiResponse";

export interface RemoveBodyParams {
    userId: string
    productId: number
}

export async function POST(req: Request) {
    const body: RemoveBodyParams = await req.json();
    const { userId, productId } = body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        const prevCart = user?.cart!
        const updatedCart = prevCart.filter((id) => id !== productId)
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                cart: {
                    set: updatedCart
                }
            }
        })
        return apiResponse({ message: "Success" }, 200)
    } catch (error) {
        console.log(error)
        return apiResponse({ message: "Error" }, 500)

    }
}