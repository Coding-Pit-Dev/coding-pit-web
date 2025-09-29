# Implementation Plan

- [x] 1. Update Header navigation component
  - Remove consultancy link from "Proyectos" dropdown menu
  - Remove substack link from "Proyectos" dropdown menu  
  - Keep substack external link in "Publicaciones" dropdown
  - Test navigation menu displays correctly
  - _Requirements: 1.1, 1.2, 2.1, 2.2_

- [x] 2. Update Footer component links
  - Remove consultancy link from "Servicios" section
  - Keep substack external link in contact section
  - Verify footer layout remains intact after link removal
  - _Requirements: 1.1, 1.3, 3.2_

- [x] 3. Remove consultancy page files
  - Delete `src/pages/consultoria.astro` file
  - Delete `src/pages/proyectos/consultoria.astro` file
  - Verify pages return 404 when accessed
  - _Requirements: 1.1, 3.1, 3.2_

- [x] 4. Verify substack page accessibility
  - Confirm `src/pages/proyectos/substack.astro` file remains intact
  - Test direct URL access to substack page works
  - Verify page is not linked from any navigation menus
  - _Requirements: 2.3, 2.4_

- [x] 5. Test navigation and page access
  - Test all remaining navigation links function correctly
  - Verify consultancy pages return 404 errors
  - Confirm substack project page accessible via direct URL but hidden from menus
  - Test responsive navigation behavior on mobile devices
  - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.4_