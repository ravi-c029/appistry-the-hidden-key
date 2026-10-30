import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'

export async function GET() {
  try {
    const hints = await prisma.hint.findMany({
      where: { isPublished: true },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        title: true,
        content: true,
        order: true,
        publishedAt: true,
      },
    })

    return NextResponse.json({ hints })
  } catch (error) {
    console.error('[API] /api/hints/public error:', error)
    return NextResponse.json({ hints: [] })
  }
}

export const revalidate = 60
