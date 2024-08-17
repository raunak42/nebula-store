import { prisma } from "@/app/lib/prisma";
import { apiResponse } from "@/app/utils/helpers/apiResponse";

export async function GET(req: Request): Promise<Response> {
    const randomNumber = Math.floor(Math.random() * 26) + 0; //random number between 0 and 26
    const randomProducts = await prisma.product.findMany({
        take: 4,
        skip: randomNumber
    })
    return apiResponse({ products: randomProducts }, 200)
}