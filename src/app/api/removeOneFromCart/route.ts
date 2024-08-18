import { prisma } from "@/app/lib/prisma";
import { apiResponse } from "@/app/utils/helpers/apiResponse";

export interface RemoveOneBodyParams {
    userId: string
    productId: number
}

export async function POST(req: Request) {
    const body: RemoveOneBodyParams = await req.json();
    const { userId, productId } = body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        let cart = user?.cart!
        const indexToRemove = cart.findIndex((id) => {
            return id === productId
        })
        cart.splice(indexToRemove, 1)
        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                cart: {
                    set: cart
                }
            }
        })
        return apiResponse({ message: "Success", user: updatedUser }, 200)
    } catch (error) {
        console.log(error)
        return apiResponse({ message: "Error" }, 500)
    }
}