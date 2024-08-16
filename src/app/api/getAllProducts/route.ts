import { prisma } from "@/app/lib/prisma";
import { apiResponse } from "@/app/utils/helpers/apiResponse";

export async function GET(req: Request): Promise<Response> {
    const allProducts = await prisma.product.findMany()
    return apiResponse({ products: allProducts }, 200)
}