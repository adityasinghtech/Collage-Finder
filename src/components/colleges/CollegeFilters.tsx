'use client'

import { Filter, RotateCcw } from 'lucide-react'

interface CollegeFiltersProps {
  currentParams: Record<string, string>
  onChange: (key: string, value: string) => void
}

export default function CollegeFilters({ currentParams, onChange }: CollegeFiltersProps) {
  const types = ['Government', 'Private', 'Deemed']
  const categories = ['Engineering', 'Medical', 'Arts', 'Commerce']
  
  const handleClear = () => {
    // We clear by pushing empty values to the parent handler
    onChange('type', '')
    onChange('category', '')
    onChange('minFees', '')
    onChange('maxFees', '')
    onChange('sortBy', '')
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm sticky top-24">
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
        <h3 className="font-heading font-semibold flex items-center gap-2">
          <Filter size={16} className="text-primary-600" /> Filters
        </h3>
        <button 
          onClick={handleClear}
          className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1"
        >
          <RotateCcw size={12} /> Clear
        </button>
      </div>

      <div className="space-y-6">
        {/* Sort By */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Sort By</h4>
          <select 
            value={currentParams.sortBy || 'rating'}
            onChange={(e) => onChange('sortBy', e.target.value)}
            className="w-full border border-gray-200 rounded-lg text-sm px-3 py-2 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          >
            <option value="rating">Highest Rating</option>
            <option value="fees_asc">Fees: Low to High</option>
            <option value="fees_desc">Fees: High to Low</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>

        {/* Institution Type */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Institution Type</h4>
          <div className="space-y-2">
            {types.map(t => (
              <label key={t} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="type" 
                  value={t}
                  checked={currentParams.type === t}
                  onChange={(e) => onChange('type', e.target.value)}
                  className="text-primary-600 focus:ring-primary-500 w-4 h-4" 
                />
                <span className="text-sm text-gray-600">{t}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Course Category</h4>
          <div className="space-y-2">
            {categories.map(c => (
              <label key={c} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="category" 
                  value={c}
                  checked={currentParams.category === c}
                  onChange={(e) => onChange('category', e.target.value)}
                  className="text-primary-600 focus:ring-primary-500 w-4 h-4" 
                />
                <span className="text-sm text-gray-600">{c}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Max Fees */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Max Annual Fees</h4>
          <input 
            type="range" 
            min="0" 
            max="1000000" 
            step="50000"
            value={currentParams.maxFees || '1000000'}
            onChange={(e) => onChange('maxFees', e.target.value)}
            className="w-full accent-primary-600" 
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>₹0</span>
            <span className="font-medium text-gray-900">
              ₹{(parseInt(currentParams.maxFees || '1000000') / 100000).toFixed(1)}L
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
