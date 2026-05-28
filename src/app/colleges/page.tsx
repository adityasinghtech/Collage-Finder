'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import CollegeCard from '@/components/colleges/CollegeCard'
import CollegeFilters from '@/components/colleges/CollegeFilters'
import SearchBar from '@/components/colleges/SearchBar'
import { CollegeCardSkeleton } from '@/components/ui/Skeleton'

function CollegesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [colleges, setColleges] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 })

  // Initialize filters from URL params
  const [filters, setFilters] = useState<Record<string, string>>({
    search: searchParams.get('search') || '',
    type: searchParams.get('type') || '',
    category: searchParams.get('category') || '',
    minFees: searchParams.get('minFees') || '',
    maxFees: searchParams.get('maxFees') || '',
    sortBy: searchParams.get('sortBy') || 'rating',
    page: searchParams.get('page') || '1',
  })

  // Fetch data when filters change
  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true)
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([k, v]) => {
        if (v) params.append(k, v)
      })

      // Update URL silently
      router.replace(`/colleges?${params.toString()}`, { scroll: false })

      try {
        const res = await fetch(`/api/colleges?${params.toString()}`)
        const data = await res.json()
        setColleges(data.colleges || [])
        setPagination(data.pagination || { page: 1, totalPages: 1 })
      } catch (err) {
        console.error('Failed to fetch colleges')
      } finally {
        setLoading(false)
      }
    }

    fetchColleges()
  }, [filters, router])

  const handleFilterChange = useCallback((key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: '1' // Reset to page 1 on filter change
    }))
  }, [])

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header section */}
      <div className="bg-white border-b border-gray-200 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">Explore Colleges</h1>
          <p className="text-gray-500 mb-8 max-w-2xl">
            Find the best institutions suited to your career goals. Filter by fees, placements, and ratings.
          </p>
          <div className="max-w-2xl">
            <SearchBar 
              defaultValue={filters.search} 
              onSearch={(val) => handleFilterChange('search', val)} 
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <CollegeFilters 
              currentParams={filters} 
              onChange={handleFilterChange} 
            />
          </div>

          {/* Listing Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => <CollegeCardSkeleton key={i} />)}
              </div>
            ) : colleges.length > 0 ? (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {colleges.map(college => (
                    <CollegeCard key={college.id} college={college} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-12">
                    {Array.from({ length: pagination.totalPages }).map((_, idx) => {
                      const pageNum = idx + 1
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handleFilterChange('page', pageNum.toString())}
                          className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                            parseInt(filters.page) === pageNum
                              ? 'bg-primary-600 text-white'
                              : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-500 text-lg mb-2">No colleges found.</p>
                <p className="text-gray-400 text-sm">Try adjusting your filters or search term.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CollegesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <CollegeCardSkeleton key={i} />)}
          </div>
        </div>
      </div>
    }>
      <CollegesContent />
    </Suspense>
  )
}
