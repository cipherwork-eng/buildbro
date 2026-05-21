# BuildBro

> Describe your app. Get production code.

An AI-powered full-stack code generator that turns natural language descriptions into complete, deployable applications. Powered by **MiMo V2.5 Pro**.

## What It Does

Type what you want to build in plain English. BuildBro generates a complete codebase — files, components, API routes, database schemas, auth, everything — ready to run.

**Example prompts:**
- "Build a SaaS dashboard with user auth and Stripe billing"
- "Create a blog with MDX, full-text search, and dark mode"
- "Make a REST API with JWT auth, rate limiting, and PostgreSQL"

## Features

### AI Builder
Split-pane interface with real-time code generation:
- **Chat** — describe what you want, iterate on generated code
- **Code Viewer** — file tree, tabbed editor, syntax highlighting
- **Terminal** — live build output and progress tracking
- **Preview** — instant preview of generated applications

### Templates
Pre-built app templates to jumpstart any project:
- SaaS Dashboard, E-commerce Store, Blog Platform
- REST API, Landing Page, Real-time Chat App
- Each template is fully customizable via AI

### Project Dashboard
Manage all your generated projects in one place:
- Status tracking (active, building, deployed)
- File count, dependency monitoring
- One-click access to edit any project

## Tech Stack

- **Framework:** Next.js 16, App Router
- **UI:** React 19, TypeScript 5, Tailwind CSS v4
- **AI:** MiMo V2.5 Pro (Xiaomi MiMo API)
- **Icons:** Lucide React
- **Deployment:** Vercel

## Getting Started

```bash
# Clone
git clone https://github.com/cipherwork-eng/buildbro.git
cd buildbro

# Install
npm install

# Configure
cp .env.example .env.local
# Add your MIMO_API_KEY

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

```env
MIMO_API_KEY=your_mimo_token_plan_key
```

Required: MiMo API key from [Xiaomi MiMo API Platform](https://platform.xiaomimimo.com)

## Architecture

```
User prompt → MiMo V2.5 Pro → Streaming code generation → File parsing → Code display
```

The AI pipeline:
1. User describes their app in natural language
2. MiMo V2.5 Pro generates a structured execution plan
3. Full codebase is generated with streaming responses
4. Files are parsed, organized in a tree, and displayed in the code editor
5. Live preview renders the generated application

## License

MIT
