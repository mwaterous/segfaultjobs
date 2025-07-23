import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import React from 'react'

function Select({ className, ...props }: React.HTMLProps<HTMLSelectElement>, ref: React.Ref<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(
          'border-input bg-background ring-offset-background focus:ring-ring h-10 w-full appearance-none truncate rounded-md border py-2 pr-8 pl-3 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
      <ChevronDown className="absolute top-3 right-3 h-4 w-4 opacity-50" />
    </div>
  )
}

export default React.forwardRef(Select)
