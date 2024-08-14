import { apiResponse } from "@/app/lib/helpers/apiResponse";
import { prisma } from "@/app/lib/prisma";

export async function GET(req: Request): Promise<Response> {
    const allProducts = await prisma.product.findMany({
        take:10
    })
    return apiResponse({ products: allProducts }, 200)
}