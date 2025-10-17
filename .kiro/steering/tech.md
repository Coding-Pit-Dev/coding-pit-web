# Technology Stack

## Framework & Build System
- **Astro 5.7.5+** - Static site generator with component islands architecture
- **Node.js** - Runtime environment
- **TypeScript** - Primary language with strict type checking
- **Vite** - Build tool and dev server

## Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **SCSS/Sass** - CSS preprocessor for custom styles
- **Accessible Astro Components** - Pre-built accessible component library
- **Astro Icon** with Lucide icon set
- **Atkinson Hyperlegible** font for improved readability

## Content Management
- **MDX** - Markdown with JSX components for blog posts and projects
- **Astro Content Collections** - Type-safe content management
- **Zod** - Schema validation for content

## Development Tools
- **ESLint** - Linting with accessibility rules (jsx-a11y)
- **Prettier** - Code formatting with Astro and Tailwind plugins
- **TypeScript ESLint** - TypeScript-specific linting

## Integrations & Services
- **Resend** - Email service for contact forms
- **Stripe** - Payment processing for mentorship services (disabled, using contact forms)
- **Firebase** - Hosting and deployment
- **Partytown** - Third-party script optimization
- **Listmonk** - Newsletter service (temporarily disabled)

## Common Commands

```bash
# Development
npm run dev          # Start dev server at localhost:4321
npm run start        # Alias for dev

# Production
npm run build        # Build static site to ./dist/
npm run preview      # Preview production build locally

# Dependencies
npm install          # Install all dependencies
```

## Path Aliases
- `@components` → `./src/components`
- `@layouts` → `./src/layouts`
- `@assets` → `./src/assets`
- `@content` → `./src/content`
- `@pages` → `./src/pages`
- `@public` → `./public`
- `@post-images` → `./public/posts`
- `@project-images` → `./public/projects`

## Accessibility Requirements
- WCAG 2.1 AA compliance mandatory
- Screen reader compatibility
- Keyboard navigation support
- Color contrast validation
- Reduced motion preferences respected
- Semantic HTML structure required