'use client'

import Image from 'next/image'
import { Event } from '@/lib/types'
import { getNeighborhoodName } from '@/lib/data'

interface EventCardProps {
  event: Event
  onClick?: () => void
  size?: 'default' | 'large'
}

function getMonthAbbr(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
}

function getDay(dateString: string): string {
  const date = new Date(dateString)
  return date.getDate().toString()
}

export default function EventCard({ event, onClick, size = 'default' }: EventCardProps) {
  const isLarge = size === 'large'

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer"
    >
      {/* Card Container */}
      <div className={`relative overflow-hidden rounded-2xl bg-charcoal-100 ${isLarge ? 'aspect-[3/4]' : 'aspect-[3/4]'}`}>
        {/* Image with hover animation */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={event.flyerImage}
            alt={event.title}
            fill
            className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
            sizes={isLarge ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          />
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Date Badge - Top Left */}
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-brick-600 text-white rounded-lg overflow-hidden shadow-lg">
            <div className="bg-brick-700 px-3 py-1 text-[10px] font-bold tracking-wider text-center">
              {getMonthAbbr(event.date)}
            </div>
            <div className="px-3 py-1 text-xl font-bold text-center leading-none">
              {getDay(event.date)}
            </div>
          </div>
        </div>

        {/* Neighborhood Badge - Bottom Left */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="bg-charcoal/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wide">
            {getNeighborhoodName(event.neighborhood)}
          </div>
        </div>
      </div>

      {/* Event Info - Below Card */}
      <div className="mt-3 px-1">
        <h3 className="font-display font-bold text-charcoal text-lg leading-tight group-hover:text-brick-700 transition-colors">
          {event.title}
        </h3>
        <p className="text-charcoal-500 text-sm mt-1">
          {event.venue} &bull; {event.time}
        </p>
      </div>
    </article>
  )
}

// Featured card with expanded info panel (like the Luma screenshot)
export function EventCardFeatured({ event, onClick }: EventCardProps) {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"
    >
      {/* Flyer Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-charcoal-100">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={event.flyerImage}
            alt={event.title}
            fill
            className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Date Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-brick-600 text-white rounded-lg overflow-hidden shadow-lg">
            <div className="bg-brick-700 px-4 py-1 text-xs font-bold tracking-wider text-center">
              {getMonthAbbr(event.date)}
            </div>
            <div className="px-4 py-2 text-2xl font-bold text-center leading-none">
              {getDay(event.date)}
            </div>
          </div>
        </div>

        {/* Neighborhood Badge */}
        <div className="absolute bottom-4 left-4 z-10">
          <div className="bg-charcoal/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium uppercase tracking-wide">
            {getNeighborhoodName(event.neighborhood)}
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="py-2">
        <h3 className="font-display font-bold text-charcoal text-2xl lg:text-3xl leading-tight group-hover:text-brick-700 transition-colors uppercase tracking-wide">
          {event.title}
        </h3>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-cream-200 text-charcoal-600 text-xs font-medium rounded-full uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        <p className="text-charcoal-600 mt-4 leading-relaxed">
          {event.description}
        </p>

        {/* Venue & Time */}
        <div className="mt-6 space-y-2 text-sm text-charcoal-500">
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-4 h-4" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4" />
            <span>{event.time}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
