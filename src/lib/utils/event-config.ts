import { prisma } from '@/lib/database/prisma'

const DEFAULT_CONFIG: Record<string, string> = {
  eventTitle: 'THE HIDDEN KEY',
  eventDescription: 'A Code Mystery Hunt — Dive into the source. Find what lies beneath.',
  eventStatus: 'UPCOMING',
  eventStartAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // 48h from now
  eventEndAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  repositoryUrl: 'https://github.com/ravi-c029/appistry-the-hidden-key',
  submissionsOpen: 'true',
  leaderboardPublic: 'true',
  prizeInfo: 'First Place: First Blood Trophy + Certificate of Excellence + STC Instagram Headline\nTop 10: Official STC Instagram Spotlight (Name, Rank & Photo with consent) + Certificate of Excellence\nAll Valid Submissions: Official APPISTRY Digital Certificate',
  rules: JSON.stringify([
    'Participation is strictly limited to eligible IIT Patna students.',
    'Individual participation only — no teams.',
    'One verified submission per participant.',
    'Only the server-recorded successful submission timestamp determines ranking.',
    'Automated scripts, exploitation or leaderboard manipulation is prohibited.',
    'Duplicate or fraudulent submissions may result in disqualification.',
    'Participants must follow the official event instructions.',
    "The organizers' decision is final.",
  ]),
  faq: JSON.stringify([
    {
      q: 'Who can participate?',
      a: 'Only eligible IIT Patna students with a valid @iitp.ac.in email address.',
    },
    {
      q: 'How do I find the hidden keyword?',
      a: 'Clone the challenge repository, explore the source code using the custom unlock utility, and follow the puzzle clues.',
    },
    {
      q: 'What tools do I need?',
      a: 'Node.js (v18+), VS Code or any terminal, and Git for cloning the repository.',
    },
    {
      q: 'Can I participate in a team?',
      a: 'No. This is a strictly individual competition.',
    },
    {
      q: 'How is First Blood determined?',
      a: 'The first valid, verified submission with the correct keyword — determined by server-recorded timestamp.',
    },
  ]),
}

export async function getEventConfig(key: string): Promise<string | null> {
  const record = await prisma.eventConfig.findUnique({ where: { key } })
  return record?.value ?? DEFAULT_CONFIG[key] ?? null
}

export async function getAllEventConfig(): Promise<Record<string, string>> {
  const records = await prisma.eventConfig.findMany()
  const config: Record<string, string> = { ...DEFAULT_CONFIG }
  records.forEach(r => { config[r.key] = r.value })
  return config
}

export async function setEventConfig(key: string, value: string): Promise<void> {
  await prisma.eventConfig.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  })
}

export async function getPublicEventConfig() {
  const config = await getAllEventConfig()
  return {
    eventTitle: config.eventTitle,
    eventDescription: config.eventDescription,
    eventStatus: config.eventStatus as 'UPCOMING' | 'LIVE' | 'ENDED' | 'PAUSED',
    eventStartAt: config.eventStartAt,
    eventEndAt: config.eventEndAt,
    repositoryUrl: config.repositoryUrl,
    submissionsOpen: config.submissionsOpen === 'true',
    leaderboardPublic: config.leaderboardPublic === 'true',
    prizeInfo: config.prizeInfo,
    rules: (() => { try { return JSON.parse(config.rules); } catch { return []; } })(),
    faq: (() => { try { return JSON.parse(config.faq); } catch { return []; } })(),
  }
}
