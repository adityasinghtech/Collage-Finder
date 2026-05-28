'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { MapPin, Star, Building, GraduationCap, CheckCircle, IndianRupee, TrendingUp } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Skeleton from '@/components/ui/Skeleton'
import { formatFees, formatPackage } from '@/lib/utils'

export default function CollegeDetailPage() {
  const { slug } = useParams()
  const [college, setCollege] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetch(`/api/colleges/${slug}`)
      .then(res => res.json())
      .then(data => {
        setCollege(data)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return <div className="max-w-5xl mx-auto px-4 py-12"><Skeleton className="h-64 w-full rounded-2xl" /></div>
  }
  if (!college || college.error) {
    return <div className="max-w-5xl mx-auto px-4 py-12 text-center text-red-500">College not found</div>
  }

  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-white border-b border-gray-200 pt-10 pb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="flex gap-2 mb-3">
                <Badge variant="blue">{college.type}</Badge>
                <Badge variant="gray">{college.category}</Badge>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {college.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1"><MapPin size={16} /> {college.location}</span>
                <span className="flex items-center gap-1 text-amber-500 font-medium">
                  <Star size={16} fill="currentColor" /> {college.rating} ({college.reviewCount} reviews)
                </span>
                {college.established && <span className="flex items-center gap-1"><Building size={16} /> Estd. {college.established}</span>}
              </div>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <Button variant="outline" className="flex-1 md:flex-none">Compare</Button>
              <Button variant="primary" className="flex-1 md:flex-none">Apply Now</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-1 border-b border-gray-200 mb-8 pb-px">
          {['overview', 'courses', 'placements', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium capitalize whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab 
                  ? 'border-primary-600 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-xl font-bold mb-4">About {college.name}</h3>
                <p className="text-gray-600 leading-relaxed">{college.description || 'No description available.'}</p>
              </div>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="text-gray-500 text-sm mb-1 flex items-center gap-1"><CheckCircle size={14}/> Affiliation</div>
                  <div className="font-semibold text-gray-900">{college.affiliation || 'N/A'}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="text-gray-500 text-sm mb-1 flex items-center gap-1"><IndianRupee size={14}/> Base Fees</div>
                  <div className="font-semibold text-gray-900">{formatFees(college.fees)}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="text-gray-500 text-sm mb-1 flex items-center gap-1"><TrendingUp size={14}/> Avg Package</div>
                  <div className="font-semibold text-gray-900">{formatPackage(college.avgPackage)}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="text-gray-500 text-sm mb-1 flex items-center gap-1"><GraduationCap size={14}/> Placement Rate</div>
                  <div className="font-semibold text-gray-900">{college.placementPct ? `${college.placementPct}%` : 'N/A'}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div>
              <h3 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
                <GraduationCap className="text-primary-600" /> Courses Offered
              </h3>
              <div className="space-y-4">
                {college.courses?.map((course: any) => (
                  <div key={course.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-xl border border-gray-100 hover:border-primary-100 hover:bg-primary-50/50 transition-colors gap-4">
                    <div>
                      <h4 className="font-bold text-gray-900">{course.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{course.duration} • {course.seats} Seats</p>
                    </div>
                    <div className="text-left md:text-right">
                      <div className="font-bold text-gray-900">{formatFees(course.fees)}</div>
                      <p className="text-xs text-gray-500">Per Year</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'placements' && (
            <div className="text-center py-12">
              <TrendingUp size={48} className="mx-auto text-emerald-100 mb-4" />
              <h3 className="font-heading text-xl font-bold mb-2">Placement Highlights</h3>
              <div className="flex justify-center gap-8 mt-8">
                <div>
                  <div className="text-3xl font-bold text-emerald-600">{formatPackage(college.avgPackage)}</div>
                  <div className="text-sm text-gray-500 mt-1">Average Package</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600">{formatPackage(college.highPackage)}</div>
                  <div className="text-sm text-gray-500 mt-1">Highest Package</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">{college.placementPct}%</div>
                  <div className="text-sm text-gray-500 mt-1">Placement Rate</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h3 className="font-heading text-xl font-bold mb-6">Student Reviews</h3>
              <div className="space-y-6">
                {college.reviews?.map((review: any) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded text-sm font-bold">
                        {review.rating} <Star size={12} fill="currentColor" />
                      </div>
                      <span className="font-medium text-gray-900">{review.author}</span>
                      <span className="text-sm text-gray-400">• Batch of {review.batch}</span>
                    </div>
                    <p className="text-gray-600 italic">"{review.comment}"</p>
                  </div>
                ))}
                {(!college.reviews || college.reviews.length === 0) && (
                  <p className="text-gray-500 italic">No reviews yet.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
