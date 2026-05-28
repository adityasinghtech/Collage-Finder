import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET — fetch user's saved colleges
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const saved = await prisma.savedCollege.findMany({
    where: { userId: session.user.id },
    include: {
      college: {
        select: {
          id: true, name: true, slug: true, location: true,
          type: true, category: true, fees: true, rating: true,
          reviewCount: true, avgPackage: true,
        }
      }
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(saved.map(s => s.college))
}

// POST — save a college
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { collegeId } = await request.json()
  if (!collegeId) {
    return NextResponse.json({ error: 'collegeId required' }, { status: 400 })
  }

  try {
    const saved = await prisma.savedCollege.create({
      data: { userId: session.user.id, collegeId },
    })
    return NextResponse.json(saved, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Already saved' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}

// DELETE — unsave a college
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { collegeId } = await request.json()

  await prisma.savedCollege.deleteMany({
    where: { userId: session.user.id, collegeId },
  })

  return NextResponse.json({ success: true })
}
