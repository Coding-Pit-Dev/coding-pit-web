# Design Document

## Overview

This design document outlines the implementation of a new "Mentorías Avanzadas" (Advanced Mentoring) section in the website navigation and the creation of a dedicated landing page. The solution involves two main components:

1. **Navigation Enhancement**: Adding a new menu item to the existing "Formación" dropdown
2. **Landing Page Creation**: Building a comprehensive page following the specified content structure

The design leverages existing Astro components and styling patterns to ensure consistency with the current website architecture.

## Architecture

### Navigation Architecture

The navigation system uses a dropdown pattern implemented in the Header component (`src/components/Header.astro`). The current structure includes:

- Main navigation items as `<li class="menu-item">`
- Dropdown menus using `<li class="menu-item has-dropdown">`
- Submenu items as `<li class="submenu-item">`

The new "Mentorías Avanzadas" item will be added as a submenu item within the existing "Formación" dropdown.

### Page Architecture

The new page will follow the established Astro page structure:
- Use `DefaultLayout` as the base layout
- Implement sections using existing components where possible
- Follow the responsive grid system already in place
- Maintain accessibility standards with proper ARIA attributes

## Components and Interfaces

### Navigation Component Updates

**File**: `src/components/Header.astro`

The "Formación" dropdown menu will be updated to include the new menu item:

```astro
<li class="menu-item has-dropdown">
  <button aria-haspopup="true" aria-expanded="false">
    Formación
    <Icon name="lucide:chevron-down" size="32" />
  </button>
  <ul class="dropdown-menu">
    <li class="submenu-item">
      <a href="/formacion/mentorias">Mentorías</a>
    </li>
    <li class="submenu-item">
      <a href="/formacion/mentorias-avanzadas">Mentorías Avanzadas</a>
    </li>
  </ul>
</li>
```

### New Page Component

**File**: `src/pages/formacion/mentorias-avanzadas.astro`

The page will be structured with the following sections:

1. **Hero Section**: Using `PageHeader` component with custom styling
2. **Why Mentoring Section**: Custom section with benefits list
3. **Target Audience Section**: Custom section with user personas
4. **How It Works Section**: Step-by-step process using numbered cards
5. **Testimonials Section**: Placeholder section for future content
6. **Final CTA Section**: Call-to-action with booking button

### Reusable Components

The design will leverage existing components:

- `DefaultLayout`: Base page layout
- `PageHeader`: Hero section with title and subtitle
- Custom sections following the established grid system
- Consistent button styling using existing CSS classes

## Data Models

### Content Structure

The page content will be structured as follows:

```typescript
interface MentoriaAvanzadaContent {
  hero: {
    title: string
    subtitle: string
    ctaText: string
    ctaLink: string
  }
  whyMentoring: {
    title: string
    benefits: string[]
    ctaText: string
  }
  targetAudience: {
    title: string
    personas: string[]
    ctaText: string
  }
  howItWorks: {
    title: string
    steps: Array<{
      number: number
      title: string
      description: string
    }>
    ctaText: string
  }
  testimonials: {
    title: string
    placeholder: string
  }
  finalCta: {
    title: string
    subtitle: string
    ctaText: string
    ctaLink: string
  }
}
```

### Navigation Data

The navigation structure will be updated to include:

```typescript
interface NavigationItem {
  text: string
  href: string
  isActive?: boolean
}

interface DropdownMenu {
  title: string
  items: NavigationItem[]
}
```

## Error Handling

### Navigation Errors

- **404 Handling**: If the new page route is not accessible, users will be redirected to the 404 page
- **Menu State Management**: JavaScript handles dropdown menu states with proper error boundaries
- **Accessibility Fallbacks**: Keyboard navigation includes fallback mechanisms for screen readers

### Page Loading Errors

- **Image Loading**: All images will include alt text and loading states
- **Content Fallbacks**: Each section includes fallback content if dynamic content fails to load
- **Progressive Enhancement**: Core functionality works without JavaScript

## Testing Strategy

### Navigation Testing

1. **Functional Testing**:
   - Verify dropdown menu opens/closes correctly
   - Test keyboard navigation (Tab, Arrow keys, Escape)
   - Validate screen reader compatibility
   - Check mobile responsive behavior

2. **Visual Testing**:
   - Ensure consistent styling with existing menu items
   - Verify hover states and active states
   - Test across different screen sizes

### Page Testing

1. **Content Testing**:
   - Verify all sections render correctly
   - Test responsive layout on mobile/tablet/desktop
   - Validate accessibility compliance (WCAG 2.1 AA)

2. **Performance Testing**:
   - Measure page load times
   - Optimize images and assets
   - Test with slow network connections

3. **SEO Testing**:
   - Verify meta tags and structured data
   - Test page indexability
   - Validate internal linking structure

### Cross-browser Testing

- Test on Chrome, Firefox, Safari, Edge
- Verify mobile browser compatibility
- Test with JavaScript disabled (progressive enhancement)

## Implementation Considerations

### Styling Approach

The design will use the existing CSS architecture:
- Tailwind CSS for utility classes
- SCSS for custom styling
- CSS custom properties for theming
- Responsive design using existing breakpoints

### Accessibility Requirements

- Maintain ARIA attributes for dropdown navigation
- Ensure proper heading hierarchy (h1, h2, h3)
- Include skip links and focus management
- Provide sufficient color contrast ratios
- Support keyboard-only navigation

### Performance Optimization

- Use Astro's static generation for fast loading
- Optimize images with proper formats and sizes
- Minimize CSS and JavaScript bundles
- Implement lazy loading for below-fold content

### SEO Considerations

- Include proper meta tags and Open Graph data
- Use semantic HTML structure
- Implement structured data for mentoring services
- Create XML sitemap entry for the new page