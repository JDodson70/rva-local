'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Event } from '@/lib/types'
import { formatDateLong, getNeighborhoodName } from '@/lib/data'
import CategoryTag from '@/components/ui/CategoryTag'

interface EventModalProps {
  event: Event
  isOpen: boolean
  onClose: () => void
}

export default function EventModal({ event, isOpen, onClose }: EventModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
          aria-label="Close modal"
        >
          <XIcon className="w-5 h-5 text-charcoal" />
        </button>

        {/* Flyer Image */}
        <div className="relative aspect-[3/4] max-h-[50vh] bg-charcoal-100">
          <Image
            src={event.flyerImage}
            alt={event.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <CategoryTag category={event.category} className="mb-2" />
              <h2 className="text-2xl font-display font-bold text-charcoal">
                {event.title}
              </h2>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-charcoal-600">
              <CalendarIcon className="w-5 h-5 text-brick-700" />
              <span>{formatDateLong(event.date)}</span>
            </div>
            <div className="flex items-center gap-3 text-charcoal-600">
              <ClockIcon className="w-5 h-5 text-brick-700" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-3 text-charcoal-600">
              <MapPinIcon className="w-5 h-5 text-brick-700" />
              <span>
                {event.venue}, {getNeighborhoodName(event.neighborhood)}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-charcoal-600 leading-relaxed mb-6">
            {event.description}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {event.link && (
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 text-center"
              >
                More Info
                <ExternalLinkIcon className="w-4 h-4 ml-2 inline" />
              </a>
            )}
            <button
              onClick={() => {
                const url = `https://www.google.com/maps/search/?api=1&query=${event.coordinates[1]},${event.coordinates[0]}`
                window.open(url, '_blank')
              }}
              className="btn-outline flex-1"
            >
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}
