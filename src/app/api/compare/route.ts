import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const ids = searchParams.get('ids')?.split(',').filter(Boolean) || []

  if (ids.length < 2 || ids.length > 3) {
    return NextResponse.json(
      { error: 'Provide 2 or 3 college IDs' },
      { status: 400 }
    )
  }

  const colleges = await prisma.college.findMany({
    where: { id: { in: ids } },
    include: { courses: true },
  })

  // Return in same order as requested
  const ordered = ids.map(id => colleges.find(c => c.id === id)).filter(Boolean)
  return NextResponse.json(ordered)
}
