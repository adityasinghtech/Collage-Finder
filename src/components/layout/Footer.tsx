import Link from 'next/link'
import { BookOpen, Globe, Mail, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-heading font-bold text-xl text-gray-900 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <BookOpen size={16} className="text-white" />
              </div>
              <span>CampusIQ</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Discover, compare, and find the perfect college for your future. The smartest way to make your biggest decision.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary-600"><MessageCircle size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-gray-900"><Globe size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-primary-700"><Mail size={18} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-gray-900 mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><Link href="/colleges" className="text-sm text-gray-500 hover:text-primary-600">Browse Colleges</Link></li>
              <li><Link href="/compare" className="text-sm text-gray-500 hover:text-primary-600">Compare Tool</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-primary-600">College Predictor</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-gray-900 mb-4">Top Categories</h4>
            <ul className="space-y-3">
              <li><Link href="/colleges?category=Engineering" className="text-sm text-gray-500 hover:text-primary-600">Engineering</Link></li>
              <li><Link href="/colleges?category=Medical" className="text-sm text-gray-500 hover:text-primary-600">Medical</Link></li>
              <li><Link href="/colleges?category=Commerce" className="text-sm text-gray-500 hover:text-primary-600">Commerce</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-500 hover:text-primary-600">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-gray-500 hover:text-primary-600">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} CampusIQ. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Designed & Engineered by Aditya Singh
          </p>
        </div>
      </div>
    </footer>
  )
}
