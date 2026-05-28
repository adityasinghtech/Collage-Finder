'use client'

import Link from 'next/link'
import { MapPin, Star, TrendingUp, IndianRupee, Heart } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { formatFees, formatPackage, cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

interface CollegeCardProps {
  college: {
    id: string; name: string; slug: string; location: string
    type: string; category: string; fees: number; rating: number
    reviewCount: number; avgPackage: number | null; placementPct: number | null
  }
}

const typeColor: Record<string, any> = {
  Government: 'green',
  Private: 'blue',
  Deemed: 'purple',
}

export default function CollegeCard({ college }: CollegeCardProps) {
  const { data: session } = useSession()
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  const toggleSave = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!session) return alert('Please sign in to save colleges')
    setSaving(true)
    try {
      const res = await fetch('/api/saved', {
        method: saved ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collegeId: college.id }),
      })
      if (res.ok || res.status === 409) setSaved(!saved)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Link href={`/colleges/${college.slug}`}>
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-card card-hover group h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-primary-600 transition-colors">
              {college.name}
            </h3>
            <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
              <MapPin size={11} /> 
              <span className="truncate">{college.location}</span>
            </div>
          </div>
          <button
            onClick={toggleSave}
            disabled={saving}
            className={cn(
              'p-1.5 rounded-lg transition-colors flex-shrink-0',
              saved ? 'text-red-500 bg-red-50' : 'text-gray-300 hover:text-red-400 hover:bg-red-50',
              saving && 'opacity-50 cursor-not-allowed'
            )}
          >
            <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <Badge variant={typeColor[college.type] || 'gray'}>{college.type}</Badge>
          <Badge variant="gray">{college.category}</Badge>
        </div>

        {/* Spacer to push stats to bottom */}
        <div className="flex-1"></div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-50">
          <div className="text-center">
            <div className="flex items-center justify-center gap-0.5 text-amber-500 mb-0.5">
              <Star size={11} fill="currentColor" />
              <span className="text-xs font-semibold text-gray-700">{college.rating}</span>
            </div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wide">{college.reviewCount} revs</span>
          </div>
          <div className="text-center border-l border-r border-gray-100 px-1">
            <div className="flex items-center justify-center text-primary-600 mb-0.5">
              <IndianRupee size={11} />
              <span className="text-xs font-semibold text-gray-700">{formatFees(college.fees).replace('₹', '')}</span>
            </div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wide">Per year</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-emerald-600 mb-0.5">
              <TrendingUp size={11} />
              <span className="text-xs font-semibold text-gray-700">{formatPackage(college.avgPackage).replace('₹', '')}</span>
            </div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wide">Avg pkg</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
