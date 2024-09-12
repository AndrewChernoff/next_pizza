import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    
    const id = req.nextUrl.searchParams.get('id') || ''

    /* const products = await prisma.product.findMany({
        where: {
            name: {
                contains: param,
                mode: 'insensitive',
            },
        },
        take: 5,
    }) */

        const product = await prisma.product.findFirst({
            where: {
              id: +id,
            },
            include: {
              ingredients: true,
              items: true
            }
          })

    return NextResponse.json(product)
}