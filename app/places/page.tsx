'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { getPlaces, filterPlaces } from '@/lib/data'
import { Place, PLACE_CATEGORIES, PlaceCategory } from '@/lib/types'
import PlaceCard from '@/components/cards/PlaceCard'
import PlaceModal from '@/components/modals/PlaceModal'
import SearchBar from '@/components/ui/SearchBar'
import FilterPills from '@/components/ui/FilterPills'
import NeighborhoodSelect from '@/components/ui/NeighborhoodSelect'

export default function PlacesPage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  const initialCategory = searchParams.get('category') as PlaceCategory | null
  const initialNeighborhood = searchParams.get('neighborhood')

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory | null>(
    initialCategory
  )
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(
    initialNeighborhood
  )

  const allPlaces = getPlaces()

  const filteredPlaces = useMemo(() => {
    return filterPlaces(allPlaces, {
      category: selectedCategory || undefined,
      neighborhood: selectedNeighborhood || undefined,
      search: searchQuery || undefined,
    })
  }, [allPlaces, selectedCategory, selectedNeighborhood, searchQuery])

  // Sort alphabetically by name
  const sortedPlaces = useMemo(() => {
    return [...filteredPlaces].sort((a, b) => a.name.localeCompare(b.name))
  }, [filteredPlaces])

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="section-title">Places</h1>
          <p className="section-subtitle">
            Explore local spots around Richmond
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-8">
          {/* Search */}
          <SearchBar
            placeholder="Search places..."
            onSearch={setSearchQuery}
            defaultValue={searchQuery}
            className="max-w-md"
          />

          {/* Filter Row */}
          <div className="flex flex-wrap items-center gap-4">
            <FilterPills
              options={PLACE_CATEGORIES}
              selected={selectedCategory}
              onSelect={(value) =>
                setSelectedCategory(value as PlaceCategory | null)
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
          Showing {sortedPlaces.length} place
          {sortedPlaces.length !== 1 ? 's' : ''}
          {(selectedCategory || selectedNeighborhood || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory(null)
                setSelectedNeighborhood(null)
                setSearchQuery('')
              }}
              className="ml-2 text-forest-600 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Places Grid */}
        {sortedPlaces.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                onClick={() => setSelectedPlace(place)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-charcoal-400 mb-4">
              <MapPinIcon className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-display font-bold text-charcoal mb-2">
              No places found
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
              className="text-forest-600 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
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
    </div>
  )
}

function MapPinIcon({ className }: { className?: string }) {
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
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  )
}
