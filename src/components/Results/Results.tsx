import JobListItem from '@/components/JobListItem'
import { prisma } from '@/lib/prisma'
import { JobSearchSchema } from '@/lib/validation'
import { Prisma } from '@prisma/client'

interface ResultsProps {
  filterValues: JobSearchSchema
}

export default async function Results({ filterValues: { q, type, location, remote } }: ResultsProps) {
  const searchString = q
    ?.split(' ')
    .filter((word) => word.length > 1)
    .join(' & ')

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { location: { search: searchString } },
          { description: { search: searchString } },
        ],
      }
    : {}

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: 'Remote' } : {},
      { approved: true },
    ],
  }

  const jobs = await prisma.job.findMany({
    where,
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <JobListItem key={job.id} job={job} />
      ))}
    </div>
  )
}
