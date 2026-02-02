'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { getEvents, getPlaces } from '@/lib/data'
import { Event, Place } from '@/lib/types'
import EventModal from '@/components/modals/EventModal'
import PlaceModal from '@/components/modals/PlaceModal'

// Dynamic import to avoid SSR issues with Leaflet
const MapView = dynamic(() => import('@/components/map/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-charcoal-100 flex items-center justify-center">
      <div className="text-charcoal-400">Loading map...</div>
    </div>
  ),
})

export default function MapPage() {
  const [showEvents, setShowEvents] = useState(true)
  const [showPlaces, setShowPlaces] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)

  const events = getEvents()
  const places = getPlaces()

  return (
    <div className="h-[calc(100vh-4rem-4rem)] md:h-[calc(100vh-4rem)] relative">
      {/* Map */}
      <MapView
        events={events}
        places={places}
        showEvents={showEvents}
        showPlaces={showPlaces}
        onEventClick={setSelectedEvent}
        onPlaceClick={setSelectedPlace}
        className="absolute inset-0"
      />

      {/* Controls */}
      <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4">
        <h2 className="font-display font-bold text-charcoal mb-3">
          Map Layers
        </h2>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showEvents}
              onChange={(e) => setShowEvents(e.target.checked)}
              className="w-4 h-4 rounded border-charcoal-300 text-brick-700 focus:ring-brick-500"
            />
            <span className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-brick-700" />
              Events ({events.length})
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showPlaces}
              onChange={(e) => setShowPlaces(e.target.checked)}
              className="w-4 h-4 rounded border-charcoal-300 text-forest-600 focus:ring-forest-500"
            />
            <span className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-forest-600" />
              Places ({places.length})
            </span>
          </label>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-3 text-xs text-charcoal-500">
        <p>Click markers to view details</p>
      </div>

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
