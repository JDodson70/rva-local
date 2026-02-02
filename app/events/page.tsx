'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { getEvents, filterEvents } from '@/lib/data'
import { Event, EVENT_CATEGORIES, EventCategory } from '@/lib/types'
import EventCard from '@/components/cards/EventCard'
import EventModal from '@/components/modals/EventModal'
import SearchBar from '@/components/ui/SearchBar'
import FilterPills from '@/components/ui/FilterPills'
import NeighborhoodSelect from '@/components/ui/NeighborhoodSelect'

export default function EventsPage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  const initialCategory = searchParams.get('category') as EventCategory | null
  const initialNeighborhood = searchParams.get('neighborhood')

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | null>(
    initialCategory
  )
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(
    initialNeighborhood
  )

  const allEvents = getEvents()

  const filteredEvents = useMemo(() => {
    return filterEvents(allEvents, {
      category: selectedCategory || undefined,
      neighborhood: selectedNeighborhood || undefined,
      search: searchQuery || undefined,
    })
  }, [allEvents, selectedCategory, selectedNeighborhood, searchQuery])

  // Sort by date
  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  }, [filteredEvents])

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="section-title">Events</h1>
          <p className="section-subtitle">
            Discover what&apos;s happening in Richmond
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-8">
          {/* Search */}
          <SearchBar
            placeholder="Search events..."
            onSearch={setSearchQuery}
            defaultValue={searchQuery}
            className="max-w-md"
          />

          {/* Filter Row */}
          <div className="flex flex-wrap items-center gap-4">
            <FilterPills
              options={EVENT_CATEGORIES}
              selected={selectedCategory}
              onSelect={(value) =>
                setSelectedCategory(value as EventCategory | null)
              }
            />
            <NeighborhoodSelect
              selected={selectedNeighborhood}
              onSelect={setSelectedNeighborhood}
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-charcoal-500">
          Showing {sortedEvents.length} event
          {sortedEvents.length !== 1 ? 's' : ''}
          {(selectedCategory || selectedNeighborhood || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory(null)
                setSelectedNeighborhood(null)
                setSearchQuery('')
              }}
              className="ml-2 text-brick-700 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Events Grid */}
        {sortedEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-charcoal-400 mb-4">
              <CalendarIcon className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-display font-bold text-charcoal mb-2">
              No events found
            </h3>
            <p className="text-charcoal-500 mb-4">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={() => {
                setSelectedCategory(null)
                setSelectedNeighborhood(null)
                setSearchQuery('')
              }}
              className="text-brick-700 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Event Modal */}
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            isOpen={!!selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </div>
    </div>
  )
}

function CalendarIcon({ className }: { className?: string }) {
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
        strokeWidth={1.5}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  )
}
