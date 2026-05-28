import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const college = await prisma.college.findFirst({
      where: {
        OR: [{ id }, { slug: id }]
      },
      include: {
        courses: true,
        reviews: { orderBy: { createdAt: 'desc' }, take: 10 },
      },
    })

    if (!college) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 })
    }

    return NextResponse.json(college)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch college' }, { status: 500 })
  }
}
