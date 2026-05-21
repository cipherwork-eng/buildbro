import type { Project, Template } from './types';

export const mockProjects: Project[] = [
  {
    id: 'proj_1',
    name: 'SaaS Dashboard',
    description: 'Full-stack analytics dashboard with auth, charts, and real-time data',
    createdAt: '2025-05-15T10:30:00Z',
    updatedAt: '2025-05-20T14:22:00Z',
    status: 'active',
    files: 24,
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
  },
  {
    id: 'proj_2',
    name: 'E-commerce Store',
    description: 'Modern e-commerce platform with cart, checkout, and payment integration',
    createdAt: '2025-05-10T08:15:00Z',
    updatedAt: '2025-05-18T16:45:00Z',
    status: 'active',
    files: 38,
    tech: ['Next.js', 'Stripe', 'Tailwind CSS', 'Supabase'],
  },
  {
    id: 'proj_3',
    name: 'Blog Platform',
    description: 'MDX-powered blog with CMS, tags, and full-text search',
    createdAt: '2025-05-08T12:00:00Z',
    updatedAt: '2025-05-19T09:30:00Z',
    status: 'building',
    files: 16,
    tech: ['Next.js', 'MDX', 'Contentlayer', 'Algolia'],
  },
  {
    id: 'proj_4',
    name: 'REST API Starter',
    description: 'Production-ready API with auth, rate limiting, and OpenAPI docs',
    createdAt: '2025-05-05T15:45:00Z',
    updatedAt: '2025-05-17T11:20:00Z',
    status: 'archived',
    files: 12,
    tech: ['Hono', 'TypeScript', 'Drizzle', 'SQLite'],
  },
  {
    id: 'proj_5',
    name: 'Chat Application',
    description: 'Real-time messaging app with rooms, typing indicators, and file sharing',
    createdAt: '2025-05-12T09:00:00Z',
    updatedAt: '2025-05-21T08:15:00Z',
    status: 'active',
    files: 29,
    tech: ['Next.js', 'Socket.io', 'Redis', 'Prisma'],
  },
];

export const mockTemplates: Template[] = [
  {
    id: 'tpl_saas',
    name: 'SaaS Dashboard',
    description: 'Full-stack analytics dashboard with authentication, real-time charts, user management, and billing integration.',
    category: 'Full-Stack',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'Stripe'],
    icon: 'layout-dashboard',
    preview: '/templates/saas.png',
  },
  {
    id: 'tpl_ecommerce',
    name: 'E-commerce Store',
    description: 'Modern storefront with product catalog, cart, checkout flow, order management, and payment processing.',
    category: 'Full-Stack',
    tech: ['Next.js', 'Stripe', 'Tailwind CSS', 'Supabase'],
    icon: 'shopping-bag',
    preview: '/templates/ecommerce.png',
  },
  {
    id: 'tpl_blog',
    name: 'Blog Platform',
    description: 'MDX-powered blog engine with categories, tags, full-text search, RSS feeds, and SEO optimization.',
    category: 'Content',
    tech: ['Next.js', 'MDX', 'Contentlayer', 'Tailwind CSS'],
    icon: 'file-text',
    preview: '/templates/blog.png',
  },
  {
    id: 'tpl_api',
    name: 'REST API Starter',
    description: 'Production-ready API server with authentication, rate limiting, validation, OpenAPI docs, and database migrations.',
    category: 'Backend',
    tech: ['Hono', 'TypeScript', 'Drizzle ORM', 'SQLite'],
    icon: 'server',
    preview: '/templates/api.png',
  },
  {
    id: 'tpl_landing',
    name: 'Landing Page',
    description: 'High-converting landing page with hero, features, testimonials, pricing, FAQ, and email capture.',
    category: 'Frontend',
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    icon: 'rocket',
    preview: '/templates/landing.png',
  },
  {
    id: 'tpl_chat',
    name: 'Chat Application',
    description: 'Real-time messaging platform with rooms, direct messages, typing indicators, file sharing, and notifications.',
    category: 'Full-Stack',
    tech: ['Next.js', 'Socket.io', 'Redis', 'Prisma'],
    icon: 'message-circle',
    preview: '/templates/chat.png',
  },
];

export const sampleGeneratedFiles = [
  {
    path: 'package.json',
    content: `{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.4.0"
  }
}`,
    language: 'json',
  },
  {
    path: 'src/app/page.tsx',
    content: `import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { Pricing } from '@/components/Pricing'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <Features />
      <Pricing />
    </main>
  )
}`,
    language: 'tsx',
  },
  {
    path: 'src/app/layout.tsx',
    content: `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My App',
  description: 'Generated with BuildBro',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}`,
    language: 'tsx',
  },
  {
    path: 'src/components/Hero.tsx',
    content: `export function Hero() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">
          Build Something Amazing
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          The fastest way to go from idea to production.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            Get Started
          </button>
          <button className="border border-gray-700 text-gray-300 px-8 py-3 rounded-lg font-medium hover:border-gray-500 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}`,
    language: 'tsx',
  },
  {
    path: 'src/components/Features.tsx',
    content: `const features = [
  {
    title: 'Lightning Fast',
    description: 'Built on Next.js for optimal performance.',
    icon: '⚡',
  },
  {
    title: 'Type Safe',
    description: 'Full TypeScript support throughout.',
    icon: '🔒',
  },
  {
    title: 'Scalable',
    description: 'Grows with your user base effortlessly.',
    icon: '📈',
  },
]

export function Features() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f) => (
          <div key={f.title} className="p-6 rounded-xl bg-gray-900 border border-gray-800">
            <span className="text-3xl mb-4 block">{f.icon}</span>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-400">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}`,
    language: 'tsx',
  },
  {
    path: 'tailwind.config.ts',
    content: `import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config`,
    language: 'ts',
  },
  {
    path: 'tsconfig.json',
    content: `{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}`,
    language: 'json',
  },
];
