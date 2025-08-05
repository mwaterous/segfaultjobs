'use client'
import { Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'

export default function FilterSubmit(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus()
  return (
    <Button {...props} type="submit" className="flex items-center gap-1 w-full" disabled={props.disabled || pending}>
      {pending && <Loader2 size={16} className="animate-spin" />}
      {pending ? 'Loading...' : 'Filter Search Results'}
    </Button>
  )
}
