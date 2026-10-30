import { z } from 'zod'

export const SubmissionSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters')
    .trim(),
  email: z.string()
    .email('Invalid email address')
    .toLowerCase()
    .trim(),
  keyword: z.string()
    .min(1, 'Keyword cannot be empty')
    .max(200, 'Keyword is too long')
    .trim(),
})

export const AdminLoginSchema = z.object({
  email: z.string().email('Invalid email').toLowerCase().trim(),
  password: z.string().min(1, 'Password is required'),
})

export const HintSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200).trim(),
  content: z.string().min(1, 'Content is required').max(2000).trim(),
  order: z.number().int().default(0),
  isPublished: z.boolean().default(false),
  scheduledAt: z.string().datetime().optional().nullable(),
})

export const AnnouncementSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200).trim(),
  content: z.string().min(1, 'Content is required').max(5000).trim(),
  type: z.enum(['INFO', 'WARNING', 'SUCCESS', 'FIRST_BLOOD', 'WINNER']).default('INFO'),
  isPublished: z.boolean().default(false),
  scheduledAt: z.string().datetime().optional().nullable(),
})

export const EventConfigSchema = z.object({
  eventTitle: z.string().min(1).max(200).optional(),
  eventDescription: z.string().max(5000).optional(),
  eventStartAt: z.string().datetime().optional(),
  eventEndAt: z.string().datetime().optional(),
  eventStatus: z.enum(['UPCOMING', 'LIVE', 'ENDED', 'PAUSED']).optional(),
  repositoryUrl: z.string().url().optional(),
  submissionsOpen: z.boolean().optional(),
  leaderboardPublic: z.boolean().optional(),
  prizeInfo: z.string().max(2000).optional(),
  rules: z.string().max(10000).optional(),
  faq: z.string().max(10000).optional(),
})

export type SubmissionInput = z.infer<typeof SubmissionSchema>
export type AdminLoginInput = z.infer<typeof AdminLoginSchema>
export type HintInput = z.infer<typeof HintSchema>
export type AnnouncementInput = z.infer<typeof AnnouncementSchema>
export type EventConfigInput = z.infer<typeof EventConfigSchema>
