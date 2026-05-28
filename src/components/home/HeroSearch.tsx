'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function HeroSearch() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/colleges?search=${encodeURIComponent(query)}`)
  }

  return (
    <form 
      onSubmit={handleSearch}
      className="flex flex-col sm:flex-row items-center bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-2xl shadow-2xl max-w-2xl mx-auto animate-fade-in-up delay-200"
    >
      <div className="flex-1 flex items-center px-4 py-3 sm:py-2 w-full">
        <Search className="text-white/60 mr-3" size={20} />
        <input 
          type="text" 
          placeholder="Search by college name, city, or course..."
          className="bg-transparent border-none text-white placeholder:text-white/60 outline-none w-full text-base font-medium"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      
      <div className="hidden sm:block w-px h-8 bg-white/20 mx-2"></div>
      
      <div className="hidden sm:flex flex-1 items-center px-4 py-2 w-full border-t border-white/10 sm:border-t-0">
        <MapPin className="text-white/60 mr-3" size={20} />
        <input 
          type="text" 
          placeholder="Location (e.g. Delhi)"
          className="bg-transparent border-none text-white placeholder:text-white/60 outline-none w-full text-base font-medium"
          onChange={(e) => {
            // Optional: handled separately or appended to query
          }}
        />
      </div>
      
      <Button 
        type="submit" 
        size="lg" 
        className="w-full sm:w-auto mt-2 sm:mt-0 bg-white text-primary-700 hover:bg-gray-100 font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
      >
        Search
      </Button>
    </form>
  )
}
