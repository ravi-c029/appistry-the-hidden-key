import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
      take: 10,
      select: {
        id: true,
        title: true,
        content: true,
        type: true,
        publishedAt: true,
      },
    })

    return NextResponse.json({
      announcements: announcements.filter(a => a.publishedAt !== null),
    })
  } catch (error) {
    console.error('[API] /api/announcements/public error:', error)
    return NextResponse.json({ announcements: [] })
  }
}

export const dynamic = 'force-dynamic'
