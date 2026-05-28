'use client'

import { Search, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface SearchBarProps {
  defaultValue?: string
  onSearch: (value: string) => void
}

export default function SearchBar({ defaultValue = '', onSearch }: SearchBarProps) {
  const [value, setValue] = useState(defaultValue)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setValue(val)
    
    if (timerRef.current) clearTimeout(timerRef.current)
    
    timerRef.current = setTimeout(() => {
      onSearch(val)
    }, 500)
  }

  const handleClear = () => {
    setValue('')
    if (timerRef.current) clearTimeout(timerRef.current)
    onSearch('')
  }

  return (
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={18} className="text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
        placeholder="Search colleges by name, city, or state..."
        value={value}
        onChange={handleChange}
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
