'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import CollegeCard from '@/components/colleges/CollegeCard'
import { CollegeCardSkeleton } from '@/components/ui/Skeleton'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function SavedCollegesPage() {
  const { data: session, status } = useSession()
  const [colleges, setColleges] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      setLoading(false)
      return
    }
    
    if (status === 'authenticated') {
      fetch('/api/saved')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setColleges(data)
          setLoading(false)
        })
    }
  }, [status])

  if (status === 'loading' || loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-heading text-3xl font-bold text-gray-900 mb-8">Saved Colleges</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => <CollegeCardSkeleton key={i} />)}
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <Heart size={48} className="mx-auto text-gray-300 mb-4" />
        <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">Sign in to view saved colleges</h2>
        <p className="text-gray-500 mb-6">Create an account to save and compare your favorite colleges.</p>
        <Link href="/login">
          <Button variant="primary">Sign In</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-2 mb-8">
        <Heart size={28} className="text-red-500" fill="currentColor" />
        <h1 className="font-heading text-3xl font-bold text-gray-900">Saved Colleges</h1>
      </div>

      {colleges.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 mb-4">You haven't saved any colleges yet.</p>
          <Link href="/colleges">
            <Button variant="outline">Browse Colleges</Button>
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map(college => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      )}
    </div>
  )
}
