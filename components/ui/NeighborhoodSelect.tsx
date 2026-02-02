'use client'

import { cn } from '@/lib/utils'
import { getNeighborhoods } from '@/lib/data'

interface NeighborhoodSelectProps {
  selected: string | null
  onSelect: (value: string | null) => void
  className?: string
}

export default function NeighborhoodSelect({
  selected,
  onSelect,
  className,
}: NeighborhoodSelectProps) {
  const neighborhoods = getNeighborhoods()

  return (
    <select
      value={selected || ''}
      onChange={(e) => onSelect(e.target.value || null)}
      className={cn(
        'px-4 py-2 bg-white border border-charcoal-200 rounded-lg text-sm',
        'focus:outline-none focus:ring-2 focus:ring-brick-500 focus:border-transparent',
        className
      )}
    >
      <option value="">All Neighborhoods</option>
      {neighborhoods.map((neighborhood) => (
        <option key={neighborhood.id} value={neighborhood.id}>
          {neighborhood.name}
        </option>
      ))}
    </select>
  )
}
