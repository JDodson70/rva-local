import eventsData from '@/data/events.json'
import placesData from '@/data/places.json'
import neighborhoodsData from '@/data/neighborhoods.json'
import { Event, Place, Neighborhood, EventCategory, PlaceCategory } from './types'

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDateLong(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getEvents(): Event[] {
  return eventsData as Event[]
}

export function getPlaces(): Place[] {
  return placesData as Place[]
}

export function getNeighborhoods(): Neighborhood[] {
  return neighborhoodsData as Neighborhood[]
}

export function getEventById(id: string): Event | undefined {
  return getEvents().find((event) => event.id === id)
}

export function getPlaceById(id: string): Place | undefined {
  return getPlaces().find((place) => place.id === id)
}

export function getNeighborhoodById(id: string): Neighborhood | undefined {
  return getNeighborhoods().find((n) => n.id === id)
}

export function getNeighborhoodName(id: string): string {
  const neighborhood = getNeighborhoodById(id)
  return neighborhood?.name || id
}

export function getFeaturedEvents(): Event[] {
  return getEvents().filter((event) => event.featured)
}

export function getFeaturedPlaces(): Place[] {
  return getPlaces().filter((place) => place.featured)
}

export function getEventsByCategory(category: EventCategory): Event[] {
  return getEvents().filter((event) => event.category === category)
}

export function getPlacesByCategory(category: PlaceCategory): Place[] {
  return getPlaces().filter((place) => place.category === category)
}

export function getEventsByNeighborhood(neighborhoodId: string): Event[] {
  return getEvents().filter((event) => event.neighborhood === neighborhoodId)
}

export function getPlacesByNeighborhood(neighborhoodId: string): Place[] {
  return getPlaces().filter((place) => place.neighborhood === neighborhoodId)
}

export function getUpcomingEvents(): Event[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return getEvents()
    .filter((event) => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function getHappeningSoon(days: number = 7): Event[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const endDate = new Date(today)
  endDate.setDate(endDate.getDate() + days)

  return getEvents()
    .filter((event) => {
      const eventDate = new Date(event.date)
      return eventDate >= today && eventDate <= endDate
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function searchEvents(query: string): Event[] {
  const lowerQuery = query.toLowerCase()
  return getEvents().filter(
    (event) =>
      event.title.toLowerCase().includes(lowerQuery) ||
      event.venue.toLowerCase().includes(lowerQuery) ||
      event.description.toLowerCase().includes(lowerQuery) ||
      event.category.toLowerCase().includes(lowerQuery)
  )
}

export function searchPlaces(query: string): Place[] {
  const lowerQuery = query.toLowerCase()
  return getPlaces().filter(
    (place) =>
      place.name.toLowerCase().includes(lowerQuery) ||
      place.address.toLowerCase().includes(lowerQuery) ||
      place.description.toLowerCase().includes(lowerQuery) ||
      place.category.toLowerCase().includes(lowerQuery)
  )
}

export function searchAll(query: string): { events: Event[]; places: Place[] } {
  return {
    events: searchEvents(query),
    places: searchPlaces(query),
  }
}

export function filterEvents(
  events: Event[],
  filters: {
    category?: EventCategory
    neighborhood?: string
    search?: string
  }
): Event[] {
  let filtered = [...events]

  if (filters.category) {
    filtered = filtered.filter((e) => e.category === filters.category)
  }

  if (filters.neighborhood) {
    filtered = filtered.filter((e) => e.neighborhood === filters.neighborhood)
  }

  if (filters.search) {
    const query = filters.search.toLowerCase()
    filtered = filtered.filter(
      (e) =>
        e.title.toLowerCase().includes(query) ||
        e.venue.toLowerCase().includes(query) ||
        e.description.toLowerCase().includes(query)
    )
  }

  return filtered
}

export function filterPlaces(
  places: Place[],
  filters: {
    category?: PlaceCategory
    neighborhood?: string
    search?: string
  }
): Place[] {
  let filtered = [...places]

  if (filters.category) {
    filtered = filtered.filter((p) => p.category === filters.category)
  }

  if (filters.neighborhood) {
    filtered = filtered.filter((p) => p.neighborhood === filters.neighborhood)
  }

  if (filters.search) {
    const query = filters.search.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.address.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    )
  }

  return filtered
}
