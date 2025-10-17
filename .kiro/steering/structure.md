# Project Structure

## Root Directory
- `astro.config.mjs` - Astro configuration with integrations and aliases
- `tailwind.config.js` - Tailwind CSS configuration
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint rules with accessibility focus
- `firebase.json` - Firebase hosting configuration

## Source Structure (`src/`)

### Pages (`src/pages/`)
- **Static routes**: Direct `.astro` files for pages
- **Dynamic routes**: `[param].astro` for dynamic content
- **API routes**: `_api/` folder for server endpoints
- **Nested routing**: Folder structure mirrors URL structure

Key pages:
- `index.astro` - Homepage with hero and mentorship info
- `blog/` - Blog listing and individual post pages
- `formacion/` - Training and mentorship service pages
- `portfolio/` - Project showcase with pagination (temporarily disabled)
- `proyectos/` - Project categories and listings (temporarily disabled)

### Components (`src/components/`)
Reusable Astro components following accessibility standards:
- `Header.astro`, `Footer.astro`, `Navigation.astro` - Layout components
- `Hero.astro`, `ContentMedia.astro` - Content presentation
- `ProjectCard.astro`, `PRReviewCard.astro` - Card components
- `SiteMeta.astro`, `SocialShares.astro` - SEO and social features

### Content (`src/content/`)
- `blog/` - MDX blog posts with frontmatter schema
- `projects/` - MDX project descriptions
- `content.config.mjs` - Content collection definitions with Zod schemas

### Layouts (`src/layouts/`)
Page layout templates (not visible in tree but referenced in components)

### Assets (`src/assets/`)
- `scss/` - Custom SCSS styles organized by purpose
- `images/` - Optimized images for posts and projects
- `img/` - Site assets like logos and favicons

## Public Directory (`public/`)
Static assets served directly:
- `fonts/` - Atkinson Hyperlegible font files
- `images/` - Author and general images
- `posts/`, `projects/` - Content-specific images
- `content/blog/images/` - Blog post images

## Configuration Files
- `.astro/` - Astro build artifacts and type definitions
- `.kiro/` - Kiro IDE configuration and specs
- `tests/` - Validation and testing scripts
- `dist/` - Production build output (generated)

## Naming Conventions
- **Files**: kebab-case for all files (`blog-post.astro`)
- **Components**: PascalCase Astro components (`BlogPost.astro`)
- **Pages**: Match URL structure, use folders for organization
- **Content**: Descriptive names with dates for blog posts
- **Images**: Descriptive names, organized by content type

## Content Organization
- **Blog posts**: Spanish content with English technical terms
- **Projects**: Showcase of development work and tools
- **Mentorship**: Service descriptions and contact forms
- **Images**: Co-located with content when possible, public for shared assets