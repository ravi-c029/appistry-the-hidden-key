import { NextResponse } from 'next/server'
import { getPublicEventConfig } from '@/lib/utils/event-config'

export async function GET() {
  try {
    const config = await getPublicEventConfig()
    return NextResponse.json(config)
  } catch (error) {
    console.error('[API] /api/event/config error:', error)
    return NextResponse.json({ error: 'Failed to load event configuration' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
