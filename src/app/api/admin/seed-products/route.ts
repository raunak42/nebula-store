import { prisma } from "@/app/lib/prisma";
import { products } from "@/app/lib/products";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
    const authHeader = request.headers.get("authorization");
    const expectedSecret = process.env.SEED_SECRET;

    if (!expectedSecret || authHeader !== `Bearer ${expectedSecret}`) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const result = await prisma.product.createMany({
            data: products,
            skipDuplicates: true
        });

        return Response.json({
            message: "Products seeded successfully",
            insertedCount: result.count
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ message: "Failed to seed products" }, { status: 500 });
    }
}
