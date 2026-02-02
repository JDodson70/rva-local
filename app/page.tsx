'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getFeaturedEvents, getFeaturedPlaces, getUpcomingEvents } from '@/lib/data'
import EventCard, { EventCardFeatured } from '@/components/cards/EventCard'
import PlaceCard from '@/components/cards/PlaceCard'
import EventModal from '@/components/modals/EventModal'
import PlaceModal from '@/components/modals/PlaceModal'
import SearchBar from '@/components/ui/SearchBar'
import { Event, Place } from '@/lib/types'

export default function HomePage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)

  const featuredEvents = getFeaturedEvents()
  const featuredPlaces = getFeaturedPlaces()
  const upcomingEvents = getUpcomingEvents()

  // Get first featured event for hero, rest for grid
  const heroEvent = featuredEvents[0]
  const gridEvents = upcomingEvents.slice(0, 6)

  const handleSearch = (query: string) => {
    if (query) {
      window.location.href = `/events?search=${encodeURIComponent(query)}`
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Minimal */}
      <section className="bg-cream border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal leading-tight">
              Discover what&apos;s happening in{' '}
              <span className="text-brick-700">Richmond</span>
            </h1>
            <p className="text-lg text-charcoal-500 mt-4 max-w-xl">
              Local events, community gatherings, and the best spots in RVA.
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-md">
              <SearchBar
                placeholder="Search events, places..."
                onSearch={handleSearch}
                className="w-full"
              />
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <Link href="/events" className="btn-primary">
                Browse Events
              </Link>
              <Link href="/places" className="btn-outline">
                Explore Places
              </Link>
              <Link href="/map" className="text-charcoal-500 hover:text-charcoal-700 font-medium transition-colors">
                View Map →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section - Luma Style */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-charcoal-400 mb-8">
            Featured Events
          </h2>

          {/* Hero Featured Event */}
          {heroEvent && (
            <div className="mb-12">
              <EventCardFeatured
                event={heroEvent}
                onClick={() => setSelectedEvent(heroEvent)}
              />
            </div>
          )}

          {/* Event Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {gridEvents.slice(1).map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/events"
              className="inline-flex items-center text-brick-700 font-medium hover:text-brick-800 transition-colors"
            >
              View all events
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Places Section */}
      <section className="py-12 md:py-16 bg-cream-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-charcoal-400">
              Local Favorites
            </h2>
            <Link
              href="/places"
              className="text-forest-600 font-medium hover:text-forest-700 transition-colors text-sm"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlaces.slice(0, 6).map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                onClick={() => setSelectedPlace(place)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods CTA */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-charcoal rounded-2xl p-8 md:p-12">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-cream mb-4">
                Explore RVA Neighborhoods
              </h2>
              <p className="text-cream-200 mb-6">
                From the tree-lined streets of The Fan to the breweries of Scott&apos;s Addition.
              </p>
              <div className="flex flex-wrap gap-2">
                {['The Fan', 'Carytown', "Scott's Addition", 'Church Hill', 'Jackson Ward'].map(
                  (neighborhood) => (
                    <Link
                      key={neighborhood}
                      href={`/places?neighborhood=${neighborhood.toLowerCase().replace(/['\s]/g, '-')}`}
                      className="px-4 py-2 bg-cream-100/10 text-cream-100 rounded-full hover:bg-cream-100/20 transition-colors text-sm"
                    >
                      {neighborhood}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* Place Modal */}
      {selectedPlace && (
        <PlaceModal
          place={selectedPlace}
          isOpen={!!selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </div>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}
