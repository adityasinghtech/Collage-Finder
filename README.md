# CampusIQ — College Discovery Platform 🎓

A production-grade Next.js MVP for a College Discovery platform. Built as a demonstration of modern frontend architecture, reusable UI systems, and seamless user experiences.

## 🌟 Key Features

- **College Listing & Live Filters:** Search and filter colleges by category, fees, rating, and institution type dynamically using URL state.
- **Detailed College Profiles:** Dive deep into placement records, fee structures, courses offered, and student reviews.
- **Side-by-Side Comparison:** Compare up to 3 colleges at once to analyze tuition fees, ratings, and placement packages.
- **User Authentication:** Complete authentication flow via NextAuth.js (Register & Login).
- **Favorites & Dashboard:** Authenticated users can save colleges to a personalized dashboard for easy access later.

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS v4
- **Database:** SQLite (for local MVP)
- **ORM:** Prisma
- **Auth:** NextAuth.js
- **Icons:** Lucide React

## 🚀 Getting Started

First, install dependencies:
```bash
npm install
```

Generate Prisma client and seed the database with mock data:
```bash
npx prisma generate
npx prisma migrate dev --name init
npm run build
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔑 Demo Credentials

To test out the authentication and "Saved Colleges" feature, you can use the pre-seeded demo account:

- **Email:** `demo@campusiq.com`
- **Password:** `password123`

*(Note: You can also register a new account from the Sign Up page).*

## 💡 Architecture Decisions

- **Reusable UI:** Built a completely custom, reusable UI library (Buttons, Badges, Skeletons) from scratch using `tailwind-merge` and `clsx` without relying on heavy UI libraries.
- **Debounced Search:** Implemented custom React-based debouncing for optimal API search performance without third-party hooks.
- **Server-Side Rendering (SSR):** Leveraged Next.js App Router for high-performance API endpoints and seamless client-side hydration.
