import { cn, getCategoryColor } from '@/lib/utils'

interface CategoryTagProps {
  category: string
  className?: string
}

export default function CategoryTag({ category, className }: CategoryTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
        getCategoryColor(category),
        className
      )}
    >
      {category}
    </span>
  )
}
