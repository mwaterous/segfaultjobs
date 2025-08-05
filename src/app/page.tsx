import Results from '@/components/Results'
import Sidebar from '@/components/FilterWidget/FilterWidget'
import Title from '@/components/Title'
import { JobSearchSchema } from '@/lib/validation'

interface PageProps {
  searchParams: Promise<{
    q?: string
    type?: string
    location?: string
    remote?: boolean
  }>
}

export default async function Home(props: PageProps) {
  const searchParams = await props.searchParams;

  const {
    q,
    type,
    location,
    remote
  } = searchParams;

  const filterValues: JobSearchSchema = {
    q,
    type,
    location,
    remote: remote === true,
  }

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <Title>Developer Jobs</Title>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <Sidebar defaultValues={filterValues} />
        <Results filterValues={filterValues} />
      </section>
    </main>
  )
}
