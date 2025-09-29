# Design Document

## Overview

This design outlines the approach to remove all consultancy-related content from the website and hide the substack projects section from navigation while preserving the underlying files. The changes will focus on navigation components, footer links, and page structure modifications.

## Architecture

The website uses Astro as the static site generator with component-based architecture. The main areas that need modification are:

- **Navigation Components**: Header.astro contains the main navigation menu
- **Footer Component**: Footer.astro contains service links and contact information
- **Page Files**: Individual consultancy pages that need to be removed or redirected
- **Content Structure**: Project categorization and routing

## Components and Interfaces

### Header Navigation Component (`src/components/Header.astro`)

**Current State:**
- Contains "Proyectos" dropdown with consultancy and substack links
- Has direct navigation to consultancy services

**Required Changes:**
- Remove consultancy link from "Proyectos" dropdown menu
- Remove substack link from "Proyectos" dropdown menu
- Keep substack link in "Publicaciones" dropdown (external link to substack.com)
- Maintain other project categories (Apps, Open Source)

### Footer Component (`src/components/Footer.astro`)

**Current State:**
- "Servicios" section includes consultancy link
- Contains substack external link in contact section

**Required Changes:**
- Remove consultancy link from "Servicios" section
- Keep substack external link in contact section (this is different from the projects substack page)
- Maintain other service links (Apps development, Courses, Mentorships)

### Page Structure

**Files to Handle:**
- `src/pages/consultoria.astro` - Remove or redirect
- `src/pages/proyectos/consultoria.astro` - Remove or redirect  
- `src/pages/proyectos/substack.astro` - Keep file but remove from navigation

**Approach:**
- Delete consultancy page files entirely
- Keep substack page file but remove navigation links to it
- Substack page will remain accessible via direct URL but hidden from menus

## Data Models

No database or complex data models are involved. Changes are primarily to static navigation structures and component templates.

## Error Handling

### Consultancy Page Removal
- **404 Handling**: Deleted consultancy pages will naturally return 404 errors
- **SEO Considerations**: Search engines will eventually de-index removed pages
- **User Experience**: Users with bookmarks will see standard 404 page

### Substack Page Hiding
- **Direct Access**: Page remains functional when accessed directly
- **Navigation**: No links in menus, but page structure intact
- **SEO**: Page remains indexed but not promoted through internal linking

## Testing Strategy

### Manual Testing
1. **Navigation Verification**
   - Verify consultancy links removed from header navigation
   - Verify substack project link removed from header navigation
   - Confirm substack external link remains in publications menu
   - Check footer service links exclude consultancy

2. **Page Access Testing**
   - Confirm consultancy pages return 404
   - Verify substack project page accessible via direct URL
   - Test all remaining navigation links function correctly

3. **Visual Regression Testing**
   - Ensure navigation menus display correctly after link removal
   - Verify footer layout remains intact
   - Check responsive behavior on mobile devices

### Automated Testing
- Update existing navigation tests to reflect new menu structure
- Add tests to verify consultancy pages return 404
- Test that substack page remains accessible but not linked

## Implementation Approach

### Phase 1: Navigation Updates
1. Update Header.astro to remove consultancy and substack project links
2. Update Footer.astro to remove consultancy service link
3. Test navigation changes

### Phase 2: Page Management
1. Delete consultancy page files
2. Verify substack page remains but is unlinked
3. Test direct access to all affected pages

### Phase 3: Cleanup and Validation
1. Remove any remaining consultancy references in content
2. Update any internal links that might reference removed pages
3. Perform comprehensive testing of navigation and page access