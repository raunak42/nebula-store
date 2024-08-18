import { prisma } from "@/app/lib/prisma";
import { apiResponse } from "@/app/utils/helpers/apiResponse";

export interface AddToCartParams {
    userId: string
    productId: number
    quantity: number
}

export async function POST(req: Request) {
    const body: AddToCartParams = await req.json();
    const { userId, productId, quantity } = body

    const items: number[] = [];
    for (let i = 0; i < quantity; i++) {
        items.push(productId)
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                cart: {
                    push: items
                }
            }
        })

        return apiResponse({ message: "Success", user: user })
    } catch (error) {
        console.log(error)
        return apiResponse({ message: "Error" })
    }
}