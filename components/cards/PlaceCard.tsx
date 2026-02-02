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
      className="group cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-charcoal-100">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={place.images[0] || '/places/placeholder.svg'}
            alt={place.name}
            fill
            className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Category Tag */}
        <div className="absolute top-3 left-3 z-10">
          <CategoryTag category={place.category} />
        </div>

        {/* Neighborhood Badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="bg-charcoal/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wide">
            {getNeighborhoodName(place.neighborhood)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-3 px-1">
        <h3 className="font-display font-bold text-charcoal text-lg leading-tight group-hover:text-forest-600 transition-colors">
          {place.name}
        </h3>
        <p className="text-charcoal-500 text-sm mt-1 line-clamp-2">
          {place.description}
        </p>

        {/* Hours */}
        <div className="flex items-center gap-2 mt-2 text-xs text-charcoal-400">
          <ClockIcon className="w-3.5 h-3.5" />
          <span>{place.hours}</span>
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
