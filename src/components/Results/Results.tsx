import JobListItem from '@/components/JobListItem'
import { prisma } from '@/lib/prisma'
import { JobSearchValues } from '@/lib/validation'
import { Prisma } from '@prisma/client'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ResultsProps {
  filterValues: JobSearchValues
  page?: number
}

export default async function Results({ filterValues, page = 1 }: ResultsProps) {
  const { q, type, location, remote } = filterValues

  const jobsPerPage = 6
  const skip = (page - 1) * jobsPerPage

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
    orderBy: { createdAt: 'desc' },
    take: jobsPerPage,
    skip,
  })

  const countPromise = prisma.job.count({ where })

  const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise])

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
      {jobs.length > 0 && (
        <Pagination currentPage={page} totalPages={Math.ceil(totalResults / jobsPerPage)} filterValues={filterValues} />
      )}
    </div>
  )
}

interface PaginationProps {
  currentPage: number
  totalPages: number
  filterValues: JobSearchValues
}

function Pagination({ currentPage, totalPages, filterValues: { q, type, location, remote } }: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: 'true' }),
      page: page.toString(),
    })

    return `/?${searchParams.toString()}`
  }

  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn('flex items-center gap-2 font-semibold', currentPage <= 1 && 'invisible')}>
        <ArrowLeft size={16} />
        Previous page
      </Link>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn('flex items-center gap-2 font-semibold', currentPage >= totalPages && 'invisible')}>
        Next page
        <ArrowRight size={16} />
      </Link>
    </div>
  )
}
