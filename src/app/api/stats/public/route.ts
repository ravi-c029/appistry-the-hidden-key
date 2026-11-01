import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'

export async function GET() {
  try {
    const [totalSubmissions, validSubmissions, firstBlood, activeVisitors] = await Promise.all([
      prisma.submission.count(),
      prisma.submission.count({ where: { isValid: true } }),
      prisma.firstBlood.findFirst(),
      prisma.visitorSession.count({ where: { isActive: true } }),
    ])

    return NextResponse.json({
      totalSubmissions,
      validSubmissions,
      firstBloodClaimed: !!firstBlood,
      activeVisitors,
    })
  } catch (error) {
    console.error('[API] /api/stats/public error:', error)
    return NextResponse.json({
      totalSubmissions: 0,
      validSubmissions: 0,
      firstBloodClaimed: false,
      activeVisitors: 0,
    })
  }
}

export const dynamic = 'force-dynamic'
