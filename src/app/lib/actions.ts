"use server"

import { prisma } from "./prisma"
import { products } from "./products"

export const populateDb = async () => {
    console.log("HELLO")
    await prisma.product.createMany({
        data: products
    })
}