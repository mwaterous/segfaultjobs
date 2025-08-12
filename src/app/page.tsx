import Sidebar from '@/components/FilterWidget/FilterWidget'
import Results from '@/components/Results'
import Title from '@/components/Title'
import { JobSearchValues } from '@/lib/validation'
import { Metadata } from 'next'

interface PageProps {
  searchParams: {
    q?: string
    type?: string
    location?: string
    remote?: string
    page?: string
  }
}

function getTitle({ q, type, location, remote }: JobSearchValues) {
  const titlePrefix = q
    ? `${q} jobs`
    : type
      ? `${type} developer jobs`
      : remote
        ? 'Remote developer jobs'
        : 'All developer jobs'

  const titleSuffix = location ? ` in ${location}` : ''

  return `${titlePrefix}${titleSuffix}`
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q, type, location, remote } = await searchParams
  return {
    title: `${getTitle({
      q,
      type,
      location,
      remote: remote === 'true',
    })} | Segfault Jobs`,
  }
}

export default async function Home(props: PageProps) {
  const searchParams = await props.searchParams

  const { q, type, location, remote } = searchParams

  const filterValues: JobSearchValues = {
    q,
    type,
    location,
    remote: remote === 'true',
  }

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <Title>{getTitle(filterValues)}</Title>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <Sidebar defaultValues={filterValues} />
        <Results filterValues={filterValues} page={page ? parseInt(page) : undefined} />
      </section>
    </main>
  )
}
