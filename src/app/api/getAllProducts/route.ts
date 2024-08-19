import { prisma } from "@/app/lib/prisma";
import { apiResponse } from "@/app/utils/helpers/apiResponse";

export async function GET(req: Request): Promise<Response> {
    try {
        const allProducts = await prisma.product.findMany()
        return apiResponse({ products: allProducts, message: "Success" }, 200)
    } catch (error) {
        console.log(error)
        return apiResponse({ message: "Error" })
    }

}