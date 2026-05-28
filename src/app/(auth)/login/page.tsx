'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (res?.error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-card border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center mx-auto mb-4">
            <BookOpen size={24} className="text-white" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-gray-900">Welcome back</h2>
          <p className="text-sm text-gray-500 mt-2">Sign in to your CampusIQ account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              placeholder="demo@campusiq.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" variant="primary" className="w-full" loading={loading}>
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link href="/register" className="text-primary-600 font-semibold hover:underline">
            Register here
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">Demo Account Credentials:</p>
          <p className="text-xs font-mono text-gray-600 mt-1">demo@campusiq.com / password123</p>
        </div>
      </div>
    </div>
  )
}
