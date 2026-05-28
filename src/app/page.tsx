import Link from 'next/link'
import { Search, GitCompare, BookOpen, Shield, Star, MapPin, Award, CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import HeroSearch from '@/components/home/HeroSearch'
import CollegeCard from '@/components/colleges/CollegeCard'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // Fetch top colleges for the home page showcase
  const topColleges = await prisma.college.findMany({
    orderBy: { rating: 'desc' },
    take: 6,
    select: {
      id: true, name: true, slug: true, location: true,
      city: true, state: true, type: true, category: true,
      fees: true, rating: true, reviewCount: true, image: true,
      avgPackage: true, placementPct: true,
    }
  })

  return (
    <main className="overflow-hidden">
      {/* Hero Section with Mesh Gradient */}
      <section className="relative bg-mesh text-white min-h-[90vh] flex flex-col justify-center pt-20 pb-24 border-b border-primary-900/50">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        
        {/* Floating background blobs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/30 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob delay-200"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="text-center max-w-4xl mx-auto">
            
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-sm mb-8 animate-fade-in-up">
              <Star size={14} className="text-yellow-300" />
              <span className="font-medium text-white/90">Trusted by 50,000+ students across India</span>
            </div>
            
            <h1 className="font-heading text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight animate-fade-in-up delay-100">
              Find Your Perfect<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-emerald-300">
                College Match
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
              Stop guessing. Start comparing. Get data-driven insights on placements, fees, and campus life to make the biggest decision of your career.
            </p>

            <HeroSearch />

            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm font-medium text-white/60 animate-fade-in-up delay-300">
              <div className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> Verified Placement Data</div>
              <div className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> 500+ Top Institutions</div>
              <div className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> Authentic Student Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Ranked Colleges Showcase */}
      <section className="py-24 bg-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-2 flex items-center gap-2">
                <Award size={16} /> Elite Institutions
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900">
                Top Rated Colleges
              </h2>
            </div>
            <Link href="/colleges">
              <Button variant="outline" className="group">
                View All Colleges 
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {topColleges.map((college, idx) => (
              <div key={college.id} className={`animate-fade-in-up delay-${(idx % 3) * 100}`}>
                <CollegeCard college={college} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to decide
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              From discovering new campuses to deep-diving into ROI. CampusIQ gives you professional tools to navigate your academic journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Search, title: 'Smart Search & Filters', desc: 'Instantly filter through hundreds of colleges by location, tuition fees, rating, and institution type to find exactly what you need.', color: 'text-blue-600', bg: 'bg-blue-50/50 hover:bg-blue-50', border: 'hover:border-blue-200' },
              { icon: GitCompare, title: 'Side-by-Side Compare', desc: 'Confused between two options? Compare up to 3 colleges simultaneously across placement records, fees, and student ratings.', color: 'text-emerald-600', bg: 'bg-emerald-50/50 hover:bg-emerald-50', border: 'hover:border-emerald-200' },
              { icon: BookOpen, title: 'Deep-Dive Profiles', desc: 'Get the full picture with comprehensive profiles detailing available courses, historical placement data, and authentic student reviews.', color: 'text-purple-600', bg: 'bg-purple-50/50 hover:bg-purple-50', border: 'hover:border-purple-200' },
            ].map((feature, i) => (
              <div key={feature.title} className={`rounded-2xl border border-gray-100 p-8 shadow-sm transition-all duration-300 hover:shadow-card hover:-translate-y-1 ${feature.bg} ${feature.border}`}>
                <div className={`w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 ${feature.color}`}>
                  <feature.icon size={26} strokeWidth={2.5} />
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Ready to find your dream college?</h2>
          <p className="text-gray-400 mb-8 text-lg">Join thousands of students making smarter career decisions.</p>
          <div className="flex justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8">Create Free Account</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
