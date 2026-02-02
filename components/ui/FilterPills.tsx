'use client'

import { cn } from '@/lib/utils'

interface FilterOption {
  value: string
  label: string
}

interface FilterPillsProps {
  options: FilterOption[]
  selected: string | null
  onSelect: (value: string | null) => void
  className?: string
}

export default function FilterPills({
  options,
  selected,
  onSelect,
  className,
}: FilterPillsProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={cn(
          'category-pill',
          selected === null ? 'category-pill-active' : 'category-pill-inactive'
        )}
      >
        All
      </button>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() =>
            onSelect(selected === option.value ? null : option.value)
          }
          className={cn(
            'category-pill',
            selected === option.value
              ? 'category-pill-active'
              : 'category-pill-inactive'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
