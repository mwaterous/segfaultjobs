import { User } from '@clerk/nextjs/server'
import { UserResource } from '@clerk/types'
import { clsx, type ClassValue } from 'clsx'
import { formatDistanceToNowStrict } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function relativeDate(from: Date): string {
  // const now = new Date()
  // const pastDate = new Date(date)
  // const seconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000)

  // if (seconds < 60) return `${seconds} seconds ago`
  // if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
  // if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  // if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`
  // if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} months ago`

  // return `${Math.floor(seconds / 31536000)} years ago`
  return formatDistanceToNowStrict(from, { addSuffix: true })
}

export function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}

export function isAdmin(user: UserResource | User) {
  return user.publicMetadata?.role === 'admin'
}
