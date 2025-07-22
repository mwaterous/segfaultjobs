import JobListItem from '@/components/JobListItem'
import { prisma } from '@/lib/prisma'

export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: {
      approved: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <div className="w-full space-y-5 text-center">
          <h1>Job Listings</h1>
        </div>
        <section className="space-y-4">

        {jobs.map((job) => (
          <JobListItem key={job.id} job={job} />
        ))}
        </section>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]"></footer>
    </div>
  )
}
