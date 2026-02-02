'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Event, Place } from '@/lib/types'
import { RVA_CENTER, RVA_ZOOM } from '@/lib/utils'
import { getNeighborhoodName, formatDate } from '@/lib/data'

// Fix for default marker icons in Next.js
const eventIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div style="background-color: #9B2C2C; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
})

const placeIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div style="background-color: #2D5016; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
})

interface MapViewProps {
  events?: Event[]
  places?: Place[]
  showEvents?: boolean
  showPlaces?: boolean
  onEventClick?: (event: Event) => void
  onPlaceClick?: (place: Place) => void
  className?: string
}

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()

  useEffect(() => {
    map.setView(center, zoom)
  }, [map, center, zoom])

  return null
}

export default function MapView({
  events = [],
  places = [],
  showEvents = true,
  showPlaces = true,
  onEventClick,
  onPlaceClick,
  className,
}: MapViewProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className={`bg-charcoal-100 rounded-xl flex items-center justify-center ${className}`}>
        <div className="text-charcoal-400">Loading map...</div>
      </div>
    )
  }

  return (
    <MapContainer
      center={RVA_CENTER}
      zoom={RVA_ZOOM}
      scrollWheelZoom={true}
      className={`rounded-xl ${className}`}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController center={RVA_CENTER} zoom={RVA_ZOOM} />

      {/* Event Markers */}
      {showEvents &&
        events.map((event) => (
          <Marker
            key={event.id}
            position={[event.coordinates[1], event.coordinates[0]]}
            icon={eventIcon}
            eventHandlers={{
              click: () => onEventClick?.(event),
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <h3 className="font-display font-bold text-charcoal mb-1">
                  {event.title}
                </h3>
                <p className="text-sm text-charcoal-500 mb-1">{event.venue}</p>
                <p className="text-sm text-brick-700 font-medium">
                  {formatDate(event.date)} &bull; {event.time}
                </p>
                <button
                  onClick={() => onEventClick?.(event)}
                  className="mt-2 text-sm text-brick-700 hover:underline"
                >
                  View details &rarr;
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

      {/* Place Markers */}
      {showPlaces &&
        places.map((place) => (
          <Marker
            key={place.id}
            position={[place.coordinates[1], place.coordinates[0]]}
            icon={placeIcon}
            eventHandlers={{
              click: () => onPlaceClick?.(place),
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <h3 className="font-display font-bold text-charcoal mb-1">
                  {place.name}
                </h3>
                <p className="text-sm text-charcoal-500 mb-1">
                  {getNeighborhoodName(place.neighborhood)}
                </p>
                <p className="text-sm text-forest-600 font-medium capitalize">
                  {place.category}
                </p>
                <button
                  onClick={() => onPlaceClick?.(place)}
                  className="mt-2 text-sm text-forest-600 hover:underline"
                >
                  View details &rarr;
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  )
}
