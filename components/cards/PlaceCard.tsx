'use client'

import Image from 'next/image'
import { Place } from '@/lib/types'
import { getNeighborhoodName } from '@/lib/data'
import CategoryTag from '@/components/ui/CategoryTag'

interface PlaceCardProps {
  place: Place
  onClick?: () => void
}

export default function PlaceCard({ place, onClick }: PlaceCardProps) {
  return (
    <article
      onClick={onClick}
      className="card cursor-pointer group"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-charcoal-100 overflow-hidden">
        <Image
          src={place.images[0] || '/places/placeholder.jpg'}
          alt={place.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Category Tag */}
        <div className="absolute top-3 left-3 z-10">
          <CategoryTag category={place.category} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-display font-bold text-charcoal group-hover:text-brick-700 transition-colors">
          {place.name}
        </h3>
        <p className="text-sm text-charcoal-500 mt-1">
          {getNeighborhoodName(place.neighborhood)}
        </p>
        <p className="text-sm text-charcoal-400 mt-2 line-clamp-2">
          {place.description}
        </p>

        {/* Footer */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-charcoal-100 text-xs text-charcoal-500">
          <span className="flex items-center gap-1">
            <ClockIcon className="w-3.5 h-3.5" />
            {place.hours}
          </span>
        </div>
      </div>
    </article>
  )
}

// Compact version for lists
export function PlaceCardCompact({ place, onClick }: PlaceCardProps) {
  return (
    <article
      onClick={onClick}
      className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-charcoal-100">
        <Image
          src={place.images[0] || '/places/placeholder.jpg'}
          alt={place.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-charcoal truncate">{place.name}</h3>
        <p className="text-sm text-charcoal-500 truncate">
          {getNeighborhoodName(place.neighborhood)}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <CategoryTag category={place.category} className="text-[10px] px-2 py-0" />
        </div>
      </div>
    </article>
  )
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}
