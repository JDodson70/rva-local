'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getFeaturedEvents, getFeaturedPlaces, getHappeningSoon } from '@/lib/data'
import EventCard from '@/components/cards/EventCard'
import PlaceCard from '@/components/cards/PlaceCard'
import EventModal from '@/components/modals/EventModal'
import PlaceModal from '@/components/modals/PlaceModal'
import SearchBar from '@/components/ui/SearchBar'
import { Event, Place } from '@/lib/types'

export default function HomePage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const featuredEvents = getFeaturedEvents()
  const featuredPlaces = getFeaturedPlaces()
  const happeningSoon = getHappeningSoon(14)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query) {
      window.location.href = `/events?search=${encodeURIComponent(query)}`
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brick-700/20 to-forest-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-cream mb-4">
              Discover{' '}
              <span className="text-brick-400">Richmond</span>
            </h1>
            <p className="text-lg md:text-xl text-cream-200 max-w-2xl mx-auto mb-8">
              Your guide to local events, hidden gems, and the best spots in RVA.
              From art walks to coffee shops, find what makes Richmond special.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <SearchBar
                placeholder="Search events, places, neighborhoods..."
                onSearch={handleSearch}
                className="w-full"
              />
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <Link href="/events" className="btn-primary">
                Browse Events
              </Link>
              <Link href="/places" className="btn-outline border-cream-200 text-cream-200 hover:bg-cream-200 hover:text-charcoal">
                Explore Places
              </Link>
              <Link href="/map" className="btn-outline border-cream-200 text-cream-200 hover:bg-cream-200 hover:text-charcoal">
                View Map
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Happening Soon Section */}
      {happeningSoon.length > 0 && (
        <section className="py-12 md:py-16 bg-brick-700/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="section-title">Happening Soon</h2>
                <p className="section-subtitle">Events in the next two weeks</p>
              </div>
              <Link
                href="/events"
                className="text-brick-700 font-medium hover:underline"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {happeningSoon.slice(0, 4).map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => setSelectedEvent(event)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Events Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Featured Events</h2>
              <p className="section-subtitle">Don&apos;t miss these local happenings</p>
            </div>
            <Link
              href="/events"
              className="text-brick-700 font-medium hover:underline"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.slice(0, 6).map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Places Section */}
      <section className="py-12 md:py-16 bg-cream-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Local Favorites</h2>
              <p className="section-subtitle">Beloved spots around RVA</p>
            </div>
            <Link
              href="/places"
              className="text-forest-600 font-medium hover:underline"
            >
              View all &rarr;
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
          <div className="bg-charcoal rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-cream mb-4">
              Explore RVA Neighborhoods
            </h2>
            <p className="text-cream-200 max-w-2xl mx-auto mb-8">
              From the tree-lined streets of The Fan to the breweries of Scott&apos;s
              Addition, discover what makes each neighborhood unique.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['The Fan', 'Carytown', "Scott's Addition", 'Church Hill'].map(
                (neighborhood) => (
                  <Link
                    key={neighborhood}
                    href={`/places?neighborhood=${neighborhood.toLowerCase().replace(/['\s]/g, '-')}`}
                    className="px-4 py-2 bg-cream-100/10 text-cream-100 rounded-full hover:bg-cream-100/20 transition-colors"
                  >
                    {neighborhood}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Preview */}
      <section className="py-12 md:py-16 bg-cream-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Find Your Way</h2>
              <p className="section-subtitle">Events and places on the map</p>
            </div>
            <Link
              href="/map"
              className="text-brick-700 font-medium hover:underline"
            >
              Open full map &rarr;
            </Link>
          </div>
          <div className="bg-charcoal-100 rounded-2xl h-[300px] md:h-[400px] flex items-center justify-center">
            <Link
              href="/map"
              className="text-charcoal-500 hover:text-charcoal-700 transition-colors"
            >
              <div className="text-center">
                <MapIcon className="w-12 h-12 mx-auto mb-2" />
                <span className="font-medium">Click to view interactive map</span>
              </div>
            </Link>
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

function MapIcon({ className }: { className?: string }) {
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
        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
      />
    </svg>
  )
}
