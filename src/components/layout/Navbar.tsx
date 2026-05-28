'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { BookOpen, Search, GitCompare, Heart, LogOut, User, Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-heading font-bold text-xl text-gray-900">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <BookOpen size={16} className="text-white" />
          </div>
          <span>CampusIQ</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <Link href="/colleges" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
            <Search size={15} /> Colleges
          </Link>
          <Link href="/compare" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
            <GitCompare size={15} /> Compare
          </Link>
          {session && (
            <Link href="/saved" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
              <Heart size={15} /> Saved
            </Link>
          )}
        </div>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-2">
          {session ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50">
                <User size={14} className="text-gray-500" />
                <span className="text-sm text-gray-700 font-medium">{session.user?.name?.split(' ')[0]}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => signOut()}>
                <LogOut size={14} /> Sign out
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">Sign in</Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          <Link href="/colleges" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            <Search size={15} /> Colleges
          </Link>
          <Link href="/compare" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            <GitCompare size={15} /> Compare
          </Link>
          {session && (
            <Link href="/saved" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              <Heart size={15} /> Saved
            </Link>
          )}
          {!session && (
            <div className="pt-2 flex gap-2">
              <Link href="/login" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">Sign in</Button>
              </Link>
              <Link href="/register" className="flex-1">
                <Button variant="primary" size="sm" className="w-full">Register</Button>
              </Link>
            </div>
          )}
          {session && (
            <div className="pt-2 border-t border-gray-100 mt-2">
              <Button variant="ghost" size="sm" className="w-full justify-start text-red-600" onClick={() => signOut()}>
                <LogOut size={14} /> Sign out
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
