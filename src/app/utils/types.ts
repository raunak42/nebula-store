import { Prisma } from "@prisma/client";

export type PrismaProductOutput = Partial<Prisma.ProductGetPayload<{ select: {}; include: {} }>>
export type PrismaUserOutput = Partial<Prisma.UserGetPayload<{ select: {}, include: {} }>>

export interface ApiDataAttributes {
    products?: PrismaProductOutput[]
    product?: PrismaProductOutput
    message?: string
    user?: PrismaUserOutput
}