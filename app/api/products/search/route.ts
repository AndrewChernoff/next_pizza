import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    
    const param = req.nextUrl.searchParams.get('query') || ''

    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: param,
                mode: 'insensitive',
            },
        },
        take: 5,
    })

    return NextResponse.json(products)
}