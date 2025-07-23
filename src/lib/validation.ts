import { z } from 'zod'

export const jobSearchSchema = z.object({
  q: z.string().min(2).max(100).optional(),
  // type: z.enum(['full-time', 'part-time', 'contract', 'internship', 'temporary', 'volunteer']).optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
})

export type JobSearchSchema = z.infer<typeof jobSearchSchema>
