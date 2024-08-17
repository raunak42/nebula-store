import { prisma } from "@/app/lib/prisma";
import { apiResponse } from "@/app/utils/helpers/apiResponse";

interface BodyParams {
    id: string
}

export async function POST(req: Request) {
    const body: BodyParams = await req.json();
    const productId = parseInt(body.id)
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        })
        if (!product) {
            return
        }
        return apiResponse({ product: product })
    } catch (error) {
        console.log(error)
        return Response.json("Error")
    }
}   