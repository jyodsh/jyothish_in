# AGENTS.md - Project Guidelines for AI Assistants

This document provides essential information for AI agents working on this Next.js personal blog project. Follow these guidelines to ensure consistency, quality, and maintainability.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Build and Test Commands](#build-and-test-commands)
3. [Code Style Guidelines](#code-style-guidelines)
4. [React Component Creation](#react-component-creation)
5. [Testing Instructions](#testing-instructions)
6. [Security Considerations](#security-considerations)

---

## Project Overview

### Technology Stack

- **Framework**: Next.js 14.2.28 (App Router)
- **Language**: TypeScript 5.3.3
- **UI Library**: React 18.2.0
- **Styling**: Tailwind CSS 4.0.0-alpha.13
- **Content**: MDX files with next-mdx-remote
- **Fonts**: Geist Sans & Geist Mono
- **Analytics**: Vercel Analytics & Speed Insights
- **Deployment**: Netlify (configured via netlify.toml)

### Project Structure

```
app/
├── blog/              # Blog routes and MDX posts
│   ├── [slug]/        # Dynamic blog post pages
│   ├── posts/         # MDX blog post files
│   └── utils.ts       # Blog utility functions
├── components/         # Reusable React components
│   ├── nav.tsx        # Navigation component
│   ├── footer.tsx     # Footer component
│   ├── posts.tsx      # Blog posts listing
│   └── mdx.tsx        # MDX custom components
├── layout.tsx         # Root layout
├── page.tsx           # Home page
├── global.css         # Global styles
├── sitemap.ts         # Sitemap generation
├── robots.ts          # Robots.txt
├── og/                # Open Graph image generation
└── rss/               # RSS feed generation
```

### Key Features

- Personal blog with MDX content
- Dark mode support
- SEO optimization (sitemap, robots.txt, Open Graph)
- RSS feed generation
- Syntax highlighting for code blocks
- Responsive design with Tailwind CSS

---

## Build and Test Commands

### Development

```bash
# Start development server
npm run dev

# Development server runs on http://localhost:3000
```

### Production Build

```bash
# Create production build
npm run build

# Start production server
npm run start
```

### Type Checking

```bash
# Run TypeScript compiler (no emit)
npx tsc --noEmit
```

### Package Management

```bash
# Install dependencies
npm install

# Update packages (check outdated first)
npm outdated
npm update

# For major version upgrades, use npm-check-updates
npx npm-check-updates -u
npm install
```

---

## Code Style Guidelines

### TypeScript Configuration

- **Target**: ES5 (for browser compatibility)
- **Module**: ESNext
- **JSX**: Preserve (handled by Next.js)
- **Strict Mode**: Partially enabled (strictNullChecks: true)
- **Base URL**: "." (allows absolute imports from project root)

### ES6+ Standards

#### Use Modern JavaScript Features

- **Arrow Functions**: Prefer for callbacks and short functions
  ```typescript
  // ✅ Good
  const handleClick = () => { /* ... */ }
  const items = array.map(item => item.id)
  
  // ❌ Avoid
  function handleClick() { /* ... */ }
  ```

- **Template Literals**: Use for string interpolation
  ```typescript
  // ✅ Good
  const message = `Hello, ${name}!`
  const url = `/blog/${slug}`
  
  // ❌ Avoid
  const message = 'Hello, ' + name + '!'
  ```

- **Destructuring**: Extract object/array properties
  ```typescript
  // ✅ Good
  const { title, date } = metadata
  const [first, second] = items
  
  // ❌ Avoid
  const title = metadata.title
  const date = metadata.date
  ```

- **Spread Operator**: For object/array operations
  ```typescript
  // ✅ Good
  const newObj = { ...oldObj, newProp: value }
  const newArray = [...oldArray, newItem]
  
  // ❌ Avoid
  const newObj = Object.assign({}, oldObj, { newProp: value })
  ```

- **Optional Chaining**: Safe property access
  ```typescript
  // ✅ Good
  const value = obj?.property?.nested
  
  // ❌ Avoid
  const value = obj && obj.property && obj.property.nested
  ```

- **Nullish Coalescing**: Default values
  ```typescript
  // ✅ Good
  const name = user?.name ?? 'Anonymous'
  
  // ❌ Avoid
  const name = user?.name || 'Anonymous' // (falsy values become 'Anonymous')
  ```

- **Const/Let**: Never use `var`
  ```typescript
  // ✅ Good
  const constant = 'value'
  let variable = 'value'
  
  // ❌ Never
  var oldVariable = 'value'
  ```

### Import/Export Standards

- **Named Exports**: Preferred for components and utilities
  ```typescript
  // ✅ Good
  export function Component() { /* ... */ }
  export const utility = () => { /* ... */ }
  
  // Default exports acceptable for pages
  export default function Page() { /* ... */ }
  ```

- **Import Order**: Group by type
  1. External packages (React, Next.js, etc.)
  2. Internal components
  3. Utilities/helpers
  4. Types
  5. Styles

  ```typescript
  // ✅ Good
  import Link from 'next/link'
  import Image from 'next/image'
  import { MDXRemote } from 'next-mdx-remote/rsc'
  
  import { Navbar } from 'app/components/nav'
  import { formatDate } from 'app/blog/utils'
  
  import type { Metadata } from 'next'
  
  import './styles.css'
  ```

### Naming Conventions

- **Components**: PascalCase
  ```typescript
  // ✅ Good
  export function BlogPost() { /* ... */ }
  export function NavigationBar() { /* ... */ }
  ```

- **Functions/Variables**: camelCase
  ```typescript
  // ✅ Good
  const getUserData = () => { /* ... */ }
  const blogPosts = []
  ```

- **Constants**: UPPER_SNAKE_CASE for true constants
  ```typescript
  // ✅ Good
  const MAX_ITEMS = 10
  const API_BASE_URL = 'https://api.example.com'
  ```

- **Files**: kebab-case for files, match component name
  ```typescript
  // ✅ Good
  // File: blog-post.tsx
  export function BlogPost() { /* ... */ }
  
  // File: navigation-bar.tsx
  export function NavigationBar() { /* ... */ }
  ```

### TypeScript Best Practices

- **Type Annotations**: Use for function parameters and return types
  ```typescript
  // ✅ Good
  function formatDate(date: string, includeTime: boolean): string {
    // ...
  }
  
  interface BlogPost {
    title: string
    date: string
    slug: string
  }
  ```

- **Avoid `any`**: Use `unknown` or proper types
  ```typescript
  // ✅ Good
  function processData(data: unknown) {
    if (typeof data === 'string') {
      // ...
    }
  }
  
  // ❌ Avoid
  function processData(data: any) {
    // ...
  }
  ```

---

## React Component Creation

### Component Structure

Follow this structure for all React components:

```typescript
// 1. Imports (external packages first, then internal)
import Link from 'next/link'
import { formatDate } from 'app/blog/utils'
import type { BlogPost } from 'app/blog/types'

// 2. Types/Interfaces (if needed)
interface ComponentProps {
  title: string
  date?: string
  children?: React.ReactNode
}

// 3. Component function
export function ComponentName({ title, date, children }: ComponentProps) {
  // 4. Hooks (if any)
  // const [state, setState] = useState()
  
  // 5. Computed values
  const formattedDate = date ? formatDate(date) : null
  
  // 6. Event handlers
  const handleClick = () => {
    // ...
  }
  
  // 7. Render
  return (
    <div className="container">
      <h1>{title}</h1>
      {formattedDate && <p>{formattedDate}</p>}
      {children}
    </div>
  )
}
```

### Component Best Practices

#### 1. **Use Function Components with TypeScript**

```typescript
// ✅ Good - Named export, typed props
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  )
}
```

#### 2. **Server vs Client Components**

- **Server Components** (default in App Router): No 'use client' directive
  ```typescript
  // ✅ Server Component (default)
  export function BlogPost({ slug }: { slug: string }) {
    // Can directly access filesystem, databases, etc.
    const post = getBlogPost(slug)
    return <article>{post.content}</article>
  }
  ```

- **Client Components**: Add 'use client' directive for interactivity
  ```typescript
  // ✅ Client Component
  'use client'
  
  import { useState } from 'react'
  
  export function Counter() {
    const [count, setCount] = useState(0)
    return (
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    )
  }
  ```

#### 3. **Props Destructuring with Defaults**

```typescript
// ✅ Good
interface CardProps {
  title: string
  description?: string
  className?: string
}

export function Card({ 
  title, 
  description = 'No description', 
  className = '' 
}: CardProps) {
  return (
    <div className={`card ${className}`}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}
```

#### 4. **Conditional Rendering**

```typescript
// ✅ Good - Use logical AND for simple conditions
{isLoading && <Spinner />}

// ✅ Good - Use ternary for if/else
{error ? <ErrorMessage /> : <Content />}

// ✅ Good - Use early return for complex conditions
if (!data) return <Loading />

return <DataDisplay data={data} />
```

#### 5. **List Rendering with Keys**

```typescript
// ✅ Good - Use stable, unique keys
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}

// ✅ Good - Use index only if no stable ID
{items.map((item, index) => (
  <div key={index}>{item.name}</div>
))}
```

#### 6. **Event Handlers**

```typescript
// ✅ Good - Arrow functions for inline handlers
<button onClick={() => handleClick(id)}>Click</button>

// ✅ Good - Named functions for complex logic
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  // Complex logic
}

<form onSubmit={handleSubmit}>
```

#### 7. **Accessibility**

```typescript
// ✅ Good - Semantic HTML and ARIA attributes
export function Navigation() {
  return (
    <nav aria-label="Main navigation">
      <ul>
        <li>
          <a href="/" aria-current="page">Home</a>
        </li>
      </ul>
    </nav>
  )
}

// ✅ Good - Accessible buttons
<button
  type="button"
  aria-label="Close dialog"
  onClick={handleClose}
>
  ×
</button>
```

#### 8. **Styling with Tailwind CSS**

```typescript
// ✅ Good - Use Tailwind utility classes
export function Card({ title }: { title: string }) {
  return (
    <div className="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
    </div>
  )
}

// ✅ Good - Conditional classes with template literals
const className = `base-class ${isActive ? 'active' : ''} ${variant === 'primary' ? 'primary' : 'secondary'}`

// ✅ Better - Use clsx or similar for complex conditions
import { clsx } from 'clsx'

const className = clsx(
  'base-class',
  {
    'active': isActive,
    'primary': variant === 'primary',
    'secondary': variant === 'secondary'
  }
)
```

#### 9. **Component Composition**

```typescript
// ✅ Good - Compose smaller components
export function BlogPostList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="space-y-4">
      {posts.map(post => (
        <BlogPostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="border rounded p-4">
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
    </article>
  )
}
```

#### 10. **Error Boundaries and Error Handling**

```typescript
// ✅ Good - Handle errors gracefully
export function BlogPost({ slug }: { slug: string }) {
  try {
    const post = getBlogPost(slug)
    if (!post) {
      return <NotFound />
    }
    return <article>{post.content}</article>
  } catch (error) {
    console.error('Error loading post:', error)
    return <ErrorDisplay message="Failed to load post" />
  }
}
```

### Next.js Specific Patterns

#### 1. **Page Components**

```typescript
// ✅ Good - Server Component page
export default function BlogPage() {
  const posts = getBlogPosts()
  
  return (
    <div>
      <h1>Blog</h1>
      {posts.map(post => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          {post.title}
        </Link>
      ))}
    </div>
  )
}
```

#### 2. **Metadata Generation**

```typescript
// ✅ Good - Dynamic metadata
export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
  }
}
```

#### 3. **Data Fetching**

```typescript
// ✅ Good - Server Component data fetching
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  
  return <article>{post.content}</article>
}
```

---

## Testing Instructions

### Current Testing Setup

**Note**: This project does not currently have a testing framework configured. When adding tests, follow these guidelines:

### Recommended Testing Stack

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest @vitejs/plugin-react jsdom
```

### Test File Organization

```
app/
├── components/
│   ├── nav.tsx
│   └── nav.test.tsx      # Tests next to components
└── blog/
    ├── utils.ts
    └── utils.test.ts     # Tests next to utilities
```

### Writing Tests

```typescript
// Example: app/components/nav.test.tsx
import { render, screen } from '@testing-library/react'
import { Navbar } from './nav'

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(<Navbar />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
  })
  
  it('has correct href attributes', () => {
    render(<Navbar />)
    
    const homeLink = screen.getByText('Home').closest('a')
    expect(homeLink).toHaveAttribute('href', '/')
  })
})
```

### Testing Best Practices

1. **Test user behavior, not implementation**
2. **Use descriptive test names**
3. **Keep tests isolated and independent**
4. **Test edge cases and error states**
5. **Mock external dependencies**

---

## Security Considerations

### 1. **Input Sanitization**

- **MDX Content**: Always use `next-mdx-remote` for rendering MDX to prevent XSS
  ```typescript
  // ✅ Good - Using next-mdx-remote
  import { MDXRemote } from 'next-mdx-remote/rsc'
  
  export function BlogPost({ source }) {
    return <MDXRemote source={source} />
  }
  
  // ❌ Never - Directly rendering user content
  <div dangerouslySetInnerHTML={{ __html: userContent }} />
  ```

### 2. **Environment Variables**

- Store sensitive data in environment variables
- Never commit `.env.local` or `.env` files
- Use `NEXT_PUBLIC_` prefix only for client-side variables
  ```typescript
  // ✅ Good - Server-side only
  const apiKey = process.env.API_KEY
  
  // ✅ Good - Client-side (public)
  const publicUrl = process.env.NEXT_PUBLIC_SITE_URL
  
  // ❌ Never - Expose secrets to client
  const secret = process.env.SECRET_KEY // Missing NEXT_PUBLIC_ prefix
  ```

### 3. **External Links**

- Always use `rel="noopener noreferrer"` for external links
  ```typescript
  // ✅ Good
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">
    External Link
  </a>
  ```

### 4. **API Routes**

- Validate all input data
- Use TypeScript for type safety
- Implement rate limiting for public APIs
- Sanitize database queries (use parameterized queries)

### 5. **Content Security**

- Validate file uploads (if applicable)
- Check file types and sizes
- Scan for malicious content
- Use HTTPS in production

### 6. **Dependencies**

- Regularly update dependencies to patch security vulnerabilities
- Use `npm audit` to check for known vulnerabilities
  ```bash
  npm audit
  npm audit fix
  ```

### 7. **Headers and CORS**

- Configure security headers in `next.config.js`
- Set appropriate CORS policies
- Use Content Security Policy (CSP) headers

---

## Additional Guidelines

### File Organization

- Keep components small and focused (single responsibility)
- Group related files together
- Use index files for cleaner imports when appropriate

### Performance

- Use Next.js Image component for images
- Implement code splitting for large components
- Use React.memo for expensive components
- Optimize bundle size

### Documentation

- Add JSDoc comments for complex functions
- Document component props with TypeScript interfaces
- Keep README.md updated

### Git Workflow

- Use meaningful commit messages
- Create feature branches for new features
- Keep commits atomic and focused

---

## Quick Reference

### Common Patterns

```typescript
// Server Component with data fetching
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}

// Client Component with state
'use client'
export function InteractiveComponent() {
  const [state, setState] = useState()
  return <button onClick={() => setState(!state)}>Toggle</button>
}

// Component with props
interface Props {
  title: string
  optional?: string
}

export function Component({ title, optional = 'default' }: Props) {
  return <h1>{title}</h1>
}
```

### Import Aliases

- Use absolute imports from project root (configured in tsconfig.json)
- Example: `**import** { Navbar } from 'app/components/nav'`

---

**Last Updated**: 2024
**Maintainer**: Jyothish Sebastian

