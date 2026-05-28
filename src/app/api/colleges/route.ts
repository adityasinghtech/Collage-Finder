import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type') || ''
    const category = searchParams.get('category') || ''
    const state = searchParams.get('state') || ''
    const minFees = parseInt(searchParams.get('minFees') || '0')
    const maxFees = parseInt(searchParams.get('maxFees') || '10000000')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const sortBy = searchParams.get('sortBy') || 'rating'
    const offset = (page - 1) * limit

    const where: any = {
      AND: [
        search ? {
          OR: [
            { name: { contains: search } },
            { city: { contains: search } },
            { state: { contains: search } },
          ]
        } : {},
        type ? { type } : {},
        category ? { category } : {},
        state ? { state: { contains: state } } : {},
        { fees: { gte: minFees, lte: maxFees } },
      ]
    }

    const orderBy: any = {
      rating: { rating: 'desc' },
      fees_asc: { fees: 'asc' },
      fees_desc: { fees: 'desc' },
      name: { name: 'asc' },
    }[sortBy] || { rating: 'desc' }

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        orderBy,
        skip: offset,
        take: limit,
        select: {
          id: true, name: true, slug: true, location: true,
          city: true, state: true, type: true, category: true,
          fees: true, rating: true, reviewCount: true, image: true,
          avgPackage: true, placementPct: true,
        },
      }),
      prisma.college.count({ where }),
    ])

    return NextResponse.json({
      colleges,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }
    })
  } catch (error) {
    console.error('Error fetching colleges:', error)
    return NextResponse.json({ error: 'Failed to fetch colleges' }, { status: 500 })
  }
}
