export interface Event {
  id: string
  title: string
  date: string
  time: string
  venue: string
  neighborhood: string
  category: EventCategory
  description: string
  flyerImage: string
  coordinates: [number, number]
  link: string | null
  featured?: boolean
  tags?: string[]
}

export interface Place {
  id: string
  name: string
  category: PlaceCategory
  neighborhood: string
  address: string
  description: string
  hours: string
  images: string[]
  coordinates: [number, number]
  website: string | null
  instagram: string | null
  featured?: boolean
}

export interface Neighborhood {
  id: string
  name: string
  description: string
}

export type EventCategory = 'art' | 'music' | 'market' | 'food' | 'community'
export type PlaceCategory = 'cafe' | 'bar' | 'restaurant' | 'gallery' | 'shop' | 'venue' | 'attraction'

export const EVENT_CATEGORIES: { value: EventCategory; label: string }[] = [
  { value: 'art', label: 'Art' },
  { value: 'music', label: 'Music' },
  { value: 'market', label: 'Markets' },
  { value: 'food', label: 'Food' },
  { value: 'community', label: 'Community' },
]

export const PLACE_CATEGORIES: { value: PlaceCategory; label: string }[] = [
  { value: 'cafe', label: 'Cafes' },
  { value: 'bar', label: 'Bars' },
  { value: 'restaurant', label: 'Restaurants' },
  { value: 'gallery', label: 'Galleries' },
  { value: 'shop', label: 'Shops' },
  { value: 'venue', label: 'Venues' },
  { value: 'attraction', label: 'Attractions' },
]
