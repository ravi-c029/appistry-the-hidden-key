import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'

const DEFAULT_HINTS = [
  {
    id: 'default-hint-1',
    title: 'The Name Game 🧐',
    content: `Okay, let's start with something simple. Or maybe not. 👀

Every team needs an identity, right? But this one's got three little pieces.

- First, think of the people who make technology and creativity come together.
- Next, think of a place famous for its legacy of knowledge, where ancient Magadh meets modern minds.
- And finally, what happens when online meets offline? Yep, something in between!

Three clues, three pieces, one name.

Thoda dimaag lagao, Google Baba ko thoda rest do. 😂

Did you connect the dots?`,
    order: 1,
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'default-hint-2',
    title: "What's in a Name? ✨",
    content: `Every great journey has a starting point. Some start small, some start from scratch.

But hey, who said you have to stay there? 😉

Think of two extremes:
- One represents nothingness. (Literally!)
- The other represents the highest point you can reach.

Now imagine a creative universe where ideas turn into experiences and imagination has no limits.

Put these thoughts together and you might just discover the name of what's coming next!

From where it all begins to where dreams reach their peak. 🔥`,
    order: 2,
    publishedAt: new Date().toISOString(),
  },
]

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

    if (hints.length > 0) {
      return NextResponse.json({ hints })
    }

    // Fallback to official starter clues if no hints are published in database yet
    return NextResponse.json({ hints: DEFAULT_HINTS })
  } catch (error) {
    console.error('[API] /api/hints/public error:', error)
    return NextResponse.json({ hints: DEFAULT_HINTS })
  }
}

export const dynamic = 'force-dynamic'
