import { JOB_TYPES } from '@/lib/job-types'
import { prisma } from '@/lib/prisma'
import { jobSearchSchema } from '@/lib/validation'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import Select from '../Select'
import { redirect } from 'next/navigation'

async function filterJobs(formData: FormData) {
  'use server'

  const values = Object.fromEntries(formData.entries())
  const { q, type, location, remote } = jobSearchSchema.parse(values)

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: 'true' }),
  })

  console.log('Search Params:', searchParams.toString())
  redirect(`/?${searchParams.toString()}`)
}

export default async function Sidebar() {
  const distinctLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ['location'],
    })
    .then((locations) => locations.map(({ location }) => location).filter(Boolean))) as string[]

  return (
    <aside className="bg-background sticky top-0 h-fit w-3xs rounded-lg border">
      <form action={filterJobs} className="space-y-4 p-4">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input name="q" placeholder="Title, company, etc" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select id="type" name="type" defaultValue="">
              <option value="">All Types</option>
              {JOB_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" defaultValue="">
              <option value="">All Locations</option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input id="remote" name="remote" type="checkbox" className="h-4 w-4 rounded border-gray-300 accent-black" />
            <Label htmlFor="remote">Remote</Label>
          </div>
          <Button type="submit" className="w-full">
            Filter Search Results
          </Button>
        </div>
      </form>
    </aside>
  )
}
