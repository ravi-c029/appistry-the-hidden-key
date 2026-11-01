import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // 1. Seed Admin User
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@appistry.dev'
  const rawPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin@Appistry2024!'
  const name = process.env.SEED_ADMIN_NAME || 'APPISTRY Super Admin'
  const passwordHash = await bcrypt.hash(rawPassword, 12)

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name, role: 'SUPER_ADMIN' },
    create: {
      email,
      passwordHash,
      name,
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  })
  console.log(`Admin user seeded: ${admin.email}`)

  // 2. Seed Default Hints
  const existingHints = await prisma.hint.count()
  if (existingHints === 0) {
    await prisma.hint.createMany({
      data: [
        {
          title: "The Name Game 🧐",
          content: `Okay, let's start with something simple. Or maybe not. 👀

Every team needs an identity, right? But this one's got three little pieces.

- First, think of the people who make technology and creativity come together.
- Next, think of a place famous for its legacy of knowledge, where ancient Magadh meets modern minds.
- And finally, what happens when online meets offline? Yep, something in between!

Three clues, three pieces, one name.

Thoda dimaag lagao, Google Baba ko thoda rest do. 😂

Did you connect the dots?`,
          order: 1,
          isPublished: true,
          publishedAt: new Date(),
        },
        {
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
          isPublished: true,
          publishedAt: new Date(),
        },
      ],
    })
    console.log('Default hints seeded.')
  }

  // 3. Seed Default Announcements
  const existingAnnouncements = await prisma.announcement.count()
  if (existingAnnouncements === 0) {
    await prisma.announcement.createMany({
      data: [
        {
          title: 'Welcome to APPISTRY: The Hidden Key!',
          content: 'The official mystery challenge has been initialized. Clone the repository, read the mission briefing, and prepare your developer environment.',
          type: 'INFO',
          isPublished: true,
          publishedAt: new Date(),
        },
        {
          title: 'First Blood Bounty Active',
          content: 'The first eligible IIT Patna student to discover and verify the secret keyword will receive the legendary FIRST BLOOD title and special recognition.',
          type: 'WARNING',
          isPublished: true,
          publishedAt: new Date(),
        },
      ],
    })
    console.log('Default announcements seeded.')
  }

  // 4. Seed Default Event Config
  const configs: Record<string, string> = {
    eventTitle: 'THE HIDDEN KEY',
    eventDescription: 'A Code Mystery Hunt — Dive into the source. Find what lies beneath.',
    eventStatus: 'LIVE',
    eventStartAt: new Date().toISOString(),
    eventEndAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    repositoryUrl: 'https://github.com/ravi-c029/appistry-the-hidden-key',
    submissionsOpen: 'true',
    leaderboardPublic: 'true',
    prizeInfo: 'First Place: First Blood Trophy + Certificate of Excellence\nAll Valid Submissions: Official APPISTRY Digital Certificate',
  }

  for (const [key, value] of Object.entries(configs)) {
    await prisma.eventConfig.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })
  }
  console.log('Event config seeded.')

  console.log('Seeding finished successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
