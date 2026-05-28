import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const colleges = [
  {
    name: "Indian Institute of Technology Delhi",
    slug: "iit-delhi",
    location: "New Delhi, Delhi",
    city: "New Delhi",
    state: "Delhi",
    type: "Government",
    category: "Engineering",
    fees: 200000,
    rating: 4.8,
    reviewCount: 1240,
    established: 1961,
    affiliation: "Autonomous (Deemed University)",
    description: "IIT Delhi is one of the premier engineering institutions in India, offering world-class education in technology and research.",
    avgPackage: 1800000,
    highPackage: 5000000,
    placementPct: 95,
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years", fees: 200000, seats: 90 },
      { name: "B.Tech Electrical Engineering", duration: "4 Years", fees: 200000, seats: 80 },
      { name: "M.Tech", duration: "2 Years", fees: 25000, seats: 120 },
    ],
    reviews: [
      { rating: 5, comment: "World-class faculty and infrastructure. Best decision of my life.", author: "Rahul S.", batch: 2023 },
      { rating: 4.5, comment: "Great placement opportunities and research culture.", author: "Priya M.", batch: 2022 },
    ]
  },
  {
    name: "BITS Pilani",
    slug: "bits-pilani",
    location: "Pilani, Rajasthan",
    city: "Pilani",
    state: "Rajasthan",
    type: "Private",
    category: "Engineering",
    fees: 500000,
    rating: 4.6,
    reviewCount: 892,
    established: 1964,
    affiliation: "Deemed University",
    description: "BITS Pilani is a premier private university known for its rigorous academics and strong alumni network in the tech industry.",
    avgPackage: 1500000,
    highPackage: 4200000,
    placementPct: 92,
    courses: [
      { name: "B.E. Computer Science", duration: "4 Years", fees: 500000, seats: 100 },
      { name: "B.E. Electronics", duration: "4 Years", fees: 500000, seats: 80 },
    ],
    reviews: [
      { rating: 4.5, comment: "Dual degree program is unique. Campus life is amazing.", author: "Akash T.", batch: 2023 },
    ]
  },
  {
    name: "NIT Trichy",
    slug: "nit-trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    city: "Tiruchirappalli",
    state: "Tamil Nadu",
    type: "Government",
    category: "Engineering",
    fees: 150000,
    rating: 4.4,
    reviewCount: 654,
    established: 1964,
    affiliation: "National Institute of Technology",
    description: "NIT Trichy is consistently ranked among the top NITs, known for excellent placements and diverse engineering programs.",
    avgPackage: 1000000,
    highPackage: 3500000,
    placementPct: 89,
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years", fees: 150000, seats: 60 },
      { name: "B.Tech Mechanical", duration: "4 Years", fees: 150000, seats: 60 },
    ],
    reviews: [
      { rating: 4, comment: "Solid academics and great peer learning environment.", author: "Meena R.", batch: 2022 },
    ]
  },
  {
    name: "Vellore Institute of Technology",
    slug: "vit-vellore",
    location: "Vellore, Tamil Nadu",
    city: "Vellore",
    state: "Tamil Nadu",
    type: "Private",
    category: "Engineering",
    fees: 320000,
    rating: 4.1,
    reviewCount: 2100,
    established: 1984,
    affiliation: "Deemed University",
    description: "VIT Vellore is one of the largest private universities in India with strong industry connections and international collaborations.",
    avgPackage: 700000,
    highPackage: 2500000,
    placementPct: 82,
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years", fees: 320000, seats: 600 },
      { name: "B.Tech AI & ML", duration: "4 Years", fees: 340000, seats: 180 },
    ],
    reviews: [
      { rating: 4, comment: "Huge campus, lots of clubs and activities. Good for networking.", author: "Sneha P.", batch: 2023 },
    ]
  },
  {
    name: "Delhi University — Sri Ram College of Commerce",
    slug: "srcc-delhi",
    location: "New Delhi, Delhi",
    city: "New Delhi",
    state: "Delhi",
    type: "Government",
    category: "Commerce",
    fees: 15000,
    rating: 4.5,
    reviewCount: 780,
    established: 1926,
    affiliation: "University of Delhi",
    description: "SRCC is India's most prestigious commerce college, producing top business leaders, economists, and CAs.",
    avgPackage: 900000,
    highPackage: 2800000,
    placementPct: 88,
    courses: [
      { name: "B.Com (Hons)", duration: "3 Years", fees: 15000, seats: 420 },
      { name: "BA Economics (Hons)", duration: "3 Years", fees: 15000, seats: 60 },
    ],
    reviews: [
      { rating: 5, comment: "Best commerce college in India. Alumni network is incredible.", author: "Rohan G.", batch: 2022 },
    ]
  },
  {
    name: "AIIMS New Delhi",
    slug: "aiims-delhi",
    location: "New Delhi, Delhi",
    city: "New Delhi",
    state: "Delhi",
    type: "Government",
    category: "Medical",
    fees: 6500,
    rating: 4.9,
    reviewCount: 560,
    established: 1956,
    affiliation: "Autonomous Institute",
    description: "AIIMS Delhi is the crown jewel of medical education in India, renowned globally for research and patient care.",
    avgPackage: 1200000,
    highPackage: 3000000,
    placementPct: 100,
    courses: [
      { name: "MBBS", duration: "5.5 Years", fees: 6500, seats: 107 },
      { name: "MD/MS", duration: "3 Years", fees: 6500, seats: 250 },
    ],
    reviews: [
      { rating: 5, comment: "Unmatched clinical exposure and world-class faculty.", author: "Dr. Kavita N.", batch: 2021 },
    ]
  },
]

async function main() {
  console.log('🌱 Seeding database...')
  
  // Clean DB first to avoid duplicate errors on re-seed
  await prisma.review.deleteMany()
  await prisma.course.deleteMany()
  await prisma.college.deleteMany()
  await prisma.user.deleteMany()
  
  // Create a test user for auth testing
  const hashedPassword = await bcrypt.hash('password123', 10)
  const testUser = await prisma.user.upsert({
    where: { email: 'demo@campusiq.com' },
    update: {},
    create: {
      email: 'demo@campusiq.com',
      name: 'Demo User',
      password: hashedPassword,
    }
  })
  console.log(`✅ Created Demo User (demo@campusiq.com / password123)`)

  for (const college of colleges) {
    const { courses, reviews, ...collegeData } = college
    
    const created = await prisma.college.upsert({
      where: { slug: collegeData.slug },
      update: {},
      create: {
        ...collegeData,
        courses: { create: courses },
        reviews: { create: reviews },
      },
    })
    console.log(`✅ Created: ${created.name}`)
  }
  
  console.log('✨ Seeding complete!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
