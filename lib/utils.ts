import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

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

export function isUpcoming(dateString: string): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const eventDate = new Date(dateString)
  return eventDate >= today
}

export function isHappeningSoon(dateString: string, days: number = 7): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const endDate = new Date(today)
  endDate.setDate(endDate.getDate() + days)
  const eventDate = new Date(dateString)
  return eventDate >= today && eventDate <= endDate
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    // Event categories
    art: 'bg-purple-100 text-purple-800',
    music: 'bg-pink-100 text-pink-800',
    market: 'bg-amber-100 text-amber-800',
    food: 'bg-orange-100 text-orange-800',
    community: 'bg-blue-100 text-blue-800',
    // Place categories
    cafe: 'bg-amber-100 text-amber-800',
    bar: 'bg-purple-100 text-purple-800',
    restaurant: 'bg-orange-100 text-orange-800',
    gallery: 'bg-pink-100 text-pink-800',
    shop: 'bg-teal-100 text-teal-800',
    venue: 'bg-indigo-100 text-indigo-800',
    attraction: 'bg-green-100 text-green-800',
  }
  return colors[category] || 'bg-gray-100 text-gray-800'
}

export function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    // Event categories
    art: '🎨',
    music: '🎵',
    market: '🛒',
    food: '🍽️',
    community: '🤝',
    // Place categories
    cafe: '☕',
    bar: '🍺',
    restaurant: '🍴',
    gallery: '🖼️',
    shop: '🛍️',
    venue: '🎤',
    attraction: '🏛️',
  }
  return emojis[category] || '📍'
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

// Richmond, VA center coordinates
export const RVA_CENTER: [number, number] = [37.5407, -77.4360]
export const RVA_ZOOM = 13
