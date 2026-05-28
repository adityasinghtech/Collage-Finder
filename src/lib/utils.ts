import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFees(fees: number): string {
  if (fees < 1000) return `₹${fees}/yr`
  if (fees < 100000) return `₹${(fees / 1000).toFixed(0)}K/yr`
  return `₹${(fees / 100000).toFixed(1)}L/yr`
}

export function formatPackage(pkg: number | null): string {
  if (!pkg) return 'N/A'
  if (pkg < 100000) return `₹${(pkg / 1000).toFixed(0)}K`
  return `₹${(pkg / 100000).toFixed(1)} LPA`
}

export function generateSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}
