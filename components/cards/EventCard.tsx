'use client'

import Image from 'next/image'
import { Event } from '@/lib/types'
import { formatDate, getNeighborhoodName } from '@/lib/data'
import CategoryTag from '@/components/ui/CategoryTag'

interface EventCardProps {
  event: Event
  onClick?: () => void
}

export default function EventCard({ event, onClick }: EventCardProps) {
  return (
    <article
      onClick={onClick}
      className="card-flyer cursor-pointer group"
    >
      {/* Flyer Image */}
      <div className="relative aspect-[3/4] bg-charcoal-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
        <Image
          src={event.flyerImage}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Category Tag */}
        <div className="absolute top-3 left-3 z-20">
          <CategoryTag category={event.category} />
        </div>
        {/* Date Badge */}
        <div className="absolute top-3 right-3 z-20 bg-brick-700 text-white px-2 py-1 rounded text-xs font-medium">
          {formatDate(event.date)}
        </div>
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <h3 className="text-lg font-display font-bold text-white leading-tight">
            {event.title}
          </h3>
          <p className="text-cream-200 text-sm mt-1">
            {event.venue}
          </p>
        </div>
      </div>

      {/* Info Bar */}
      <div className="p-3 bg-white border-t border-charcoal-100">
        <div className="flex items-center justify-between text-xs text-charcoal-500">
          <span>{event.time}</span>
          <span>{getNeighborhoodName(event.neighborhood)}</span>
        </div>
      </div>
    </article>
  )
}

// Placeholder version for when no image is available
export function EventCardPlaceholder({ event, onClick }: EventCardProps) {
  return (
    <article
      onClick={onClick}
      className="card cursor-pointer group"
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <CategoryTag category={event.category} />
          <span className="text-xs font-medium text-brick-700">
            {formatDate(event.date)}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-lg font-display font-bold text-charcoal mb-1 group-hover:text-brick-700 transition-colors">
          {event.title}
        </h3>
        <p className="text-sm text-charcoal-500 mb-2">{event.venue}</p>
        <p className="text-sm text-charcoal-400 line-clamp-2">
          {event.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-charcoal-100 text-xs text-charcoal-500">
          <span>{event.time}</span>
          <span>{getNeighborhoodName(event.neighborhood)}</span>
        </div>
      </div>
    </article>
  )
}
