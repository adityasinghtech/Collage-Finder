import { cn } from '@/lib/utils'

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse bg-gray-200 rounded-md', className)} />
  )
}

export function CollegeCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-card">
      <div className="flex gap-4">
        <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <Skeleton className="h-12 rounded-lg" />
        <Skeleton className="h-12 rounded-lg" />
        <Skeleton className="h-12 rounded-lg" />
      </div>
    </div>
  )
}
