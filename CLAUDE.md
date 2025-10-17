# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:4321`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |

## Project Architecture

This is an Astro-based accessible starter template focused on SEO and WCAG compliance. The project is structured as a static site generator with the following key architectural patterns:

### Core Stack
- **Astro 5.7.5+** as the primary framework with static output
- **TypeScript** integration with strict configuration
- **Tailwind CSS 4** for styling with SCSS utilities
- **MDX** support for content-driven pages
- **ESLint** with accessibility-focused rules (jsx-a11y strict mode)

### Directory Structure
- `src/components/` - Reusable Astro components with accessibility features
- `src/layouts/` - Layout templates (DefaultLayout, MarkdownLayout)
- `src/pages/` - File-based routing with dynamic routes for blog/portfolio
- `src/content/` - Content collections for blog posts and projects (MDX files)
- `src/assets/` - Static assets including SCSS utilities and images
- `src/styles/` - Global styles including Tailwind CSS imports

### Content Architecture
The project uses Astro's content collections system:
- **Blog collection**: Located in `src/content/blog/` with schema for title, author, description, date, and optional images
- **Projects collection**: Located in `src/content/projects/` with schema for title, author, and description
- Content is authored in MDX format for rich interactive content

### Import Aliases
The project uses path aliases for cleaner imports:
- `@components/*` → `src/components/*`
- `@layouts/*` → `src/layouts/*`
- `@assets/*` → `src/assets/*`
- `@content/*` → `src/content/*`
- `@pages/*` → `src/pages/*`
- `@public/*` → `public/*`
- `@post-images/*` → `public/posts/*`
- `@project-images/*` → `public/projects/*`

### Accessibility Features
The project is built with accessibility as a core principle:
- Accessible landmarks (header, main, footer, nav)
- ARIA attributes for screen reader support
- Focus indicators that work on light/dark backgrounds
- Skip links functionality
- Accessible navigation with keyboard support
- Color contrast checker utility
- Atkinson Hyperlegible font for improved readability

### Key Components
- **DefaultLayout.astro**: Main layout with Header/Footer and Alpine.js integration
- **Header.astro** & **Footer.astro**: Site-wide navigation and footer content
- **Hero.astro**: Landing page hero section
- **ContentMedia.astro**: Content sections with optional media
- **Navigation.astro**: Accessible dropdown navigation
- **ResponsiveToggle.astro**: Mobile menu toggle
- **SiteMeta.astro**: SEO meta tags component

### Styling Approach
- Tailwind CSS 4 with custom OKLCH color system
- SCSS utilities in `src/assets/scss/` for additional styling patterns
- CSS logical properties and custom properties
- Responsive design with mobile-first approach
- Dark mode support with user preference detection

### Dynamic Routing
- `[post].astro` for individual blog posts
- `[project].astro` for individual project pages
- `[...page].astro` for paginated content listings
- Breadcrumb navigation for better UX

### Business Context
This appears to be a personal website for "CodingPit" focused on:
- Programming mentorship services
- Technical training and courses
- PR review services
- Blog content about development topics
- Portfolio/project showcases

The site includes Spanish content and appears to target Spanish-speaking developers seeking mentorship and technical guidance.