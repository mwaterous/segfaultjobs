import JobListItem from '@/components/JobListItem'
import { prisma } from '@/lib/prisma'
import { JobSearchValues } from '@/lib/validation'
import { Prisma } from '@prisma/client'
import Link from 'next/link'

interface ResultsProps {
  filterValues: JobSearchValues
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
      type ? { type: type } : {},
      location ? { location } : {},
      remote ? { locationType: 'Remote' } : {},
      { approved: true },
    ],
  }

  // console.log('Search Filter:', searchFilter)
  // console.log('Search Filter:', where)

  const jobs = await prisma.job.findMany({
    where,
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <div className="text-muted-foreground text-center">
          No jobs found matching your criteria. Try adjusting your search.
        </div>
      )}
    </div>
  )
}
