'use client'

import { useState, useEffect } from 'react'
import { Check, X, Search, PlusCircle, Star, IndianRupee, TrendingUp, GitCompare } from 'lucide-react'
import Button from '@/components/ui/Button'
import { formatFees, formatPackage } from '@/lib/utils'
import Skeleton from '@/components/ui/Skeleton'

export default function ComparePage() {
  // Mock search logic for MVP
  const [searchOpen, setSearchOpen] = useState(false)
  const [colleges, setColleges] = useState<any[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [compareData, setCompareData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch all colleges for search dropdown (MVP approach)
  useEffect(() => {
    fetch('/api/colleges?limit=50')
      .then(res => res.json())
      .then(data => setColleges(data.colleges || []))
  }, [])

  // Fetch compare data when selectedIds changes
  useEffect(() => {
    if (selectedIds.length === 0) {
      setCompareData([])
      return
    }
    setLoading(true)
    fetch(`/api/compare?ids=${selectedIds.join(',')}`)
      .then(res => res.json())
      .then(data => {
        setCompareData(data)
        setLoading(false)
      })
  }, [selectedIds])

  const addCollege = (id: string) => {
    if (selectedIds.length >= 3) return alert('You can compare up to 3 colleges')
    if (selectedIds.includes(id)) return
    setSelectedIds([...selectedIds, id])
    setSearchOpen(false)
  }

  const removeCollege = (id: string) => {
    setSelectedIds(selectedIds.filter(i => i !== id))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">Compare Colleges</h1>
        <p className="text-gray-500">Compare up to 3 colleges side-by-side to find your perfect fit.</p>
      </div>

      {/* College Selection Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="hidden md:block col-span-1 pt-8">
          <div className="font-semibold text-gray-400 uppercase tracking-wider text-sm">Parameters</div>
        </div>

        {Array.from({ length: 3 }).map((_, idx) => {
          const id = selectedIds[idx]
          const data = compareData.find(c => c.id === id)

          if (id && data) {
            return (
              <div key={idx} className="bg-white rounded-xl border border-primary-200 shadow-sm p-4 relative">
                <button 
                  onClick={() => removeCollege(id)}
                  className="absolute top-2 right-2 p-1 bg-red-50 text-red-500 hover:bg-red-100 rounded-full"
                >
                  <X size={14} />
                </button>
                <div className="h-12 w-12 bg-primary-50 rounded-lg mb-3 flex items-center justify-center font-heading font-bold text-primary-600">
                  {data.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-gray-900 leading-tight mb-1">{data.name}</h3>
                <p className="text-xs text-gray-500">{data.location}</p>
              </div>
            )
          }

          if (id && loading) {
            return <div key={idx}><Skeleton className="h-32 w-full" /></div>
          }

          return (
            <div key={idx} className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-gray-50/50 min-h-[140px]">
              {searchOpen ? (
                <div className="w-full relative">
                  <input 
                    autoFocus
                    type="text" 
                    className="w-full text-sm border-b-2 border-primary-500 bg-transparent outline-none pb-1 mb-2" 
                    placeholder="Type to search..."
                  />
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg rounded-lg mt-1 max-h-48 overflow-y-auto z-10">
                    {colleges.filter(c => !selectedIds.includes(c.id)).map(c => (
                      <div 
                        key={c.id} 
                        onClick={() => addCollege(c.id)}
                        className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm text-left border-b border-gray-100 last:border-0"
                      >
                        <div className="font-medium text-gray-900">{c.name}</div>
                        <div className="text-xs text-gray-500">{c.city}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => setSearchOpen(true)}
                    className="text-primary-600 hover:text-primary-700 flex flex-col items-center"
                  >
                    <PlusCircle size={24} className="mb-2" />
                    <span className="font-medium text-sm">Add College</span>
                  </button>
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* Comparison Table */}
      {selectedIds.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Rating */}
          <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-100">
            <div className="p-4 bg-gray-50 text-sm font-medium text-gray-700 md:border-r border-gray-100 flex items-center gap-2">
              <Star size={16} className="text-gray-400" /> Rating
            </div>
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="p-4 md:border-r border-gray-100 last:border-0 flex items-center justify-center bg-white">
                {compareData[idx] ? (
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-lg text-amber-500">{compareData[idx].rating}/5</span>
                    <span className="text-xs text-gray-400">{compareData[idx].reviewCount} reviews</span>
                  </div>
                ) : <span className="text-gray-300">-</span>}
              </div>
            ))}
          </div>

          {/* Fees */}
          <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-100">
            <div className="p-4 bg-gray-50 text-sm font-medium text-gray-700 md:border-r border-gray-100 flex items-center gap-2">
              <IndianRupee size={16} className="text-gray-400" /> Annual Fees
            </div>
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="p-4 md:border-r border-gray-100 last:border-0 flex items-center justify-center bg-white">
                {compareData[idx] ? (
                  <span className="font-semibold text-gray-900">{formatFees(compareData[idx].fees)}</span>
                ) : <span className="text-gray-300">-</span>}
              </div>
            ))}
          </div>

          {/* Placement */}
          <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-100">
            <div className="p-4 bg-gray-50 text-sm font-medium text-gray-700 md:border-r border-gray-100 flex items-center gap-2">
              <TrendingUp size={16} className="text-gray-400" /> Avg Package
            </div>
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="p-4 md:border-r border-gray-100 last:border-0 flex items-center justify-center bg-white">
                {compareData[idx] ? (
                  <span className="font-semibold text-emerald-600">{formatPackage(compareData[idx].avgPackage)}</span>
                ) : <span className="text-gray-300">-</span>}
              </div>
            ))}
          </div>
          
          {/* Type */}
          <div className="grid grid-cols-1 md:grid-cols-4">
            <div className="p-4 bg-gray-50 text-sm font-medium text-gray-700 md:border-r border-gray-100 flex items-center gap-2">
              Institution Type
            </div>
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="p-4 md:border-r border-gray-100 last:border-0 flex items-center justify-center bg-white">
                {compareData[idx] ? (
                  <span className="text-gray-700 text-sm">{compareData[idx].type}</span>
                ) : <span className="text-gray-300">-</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedIds.length === 0 && (
        <div className="text-center py-12 text-gray-400 border border-dashed border-gray-200 rounded-xl bg-gray-50">
          <GitCompare size={32} className="mx-auto mb-3 text-gray-300" />
          <p>Add colleges to compare their stats</p>
        </div>
      )}
    </div>
  )
}
