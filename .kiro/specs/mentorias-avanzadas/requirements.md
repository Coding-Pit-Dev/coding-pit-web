# Requirements Document

## Introduction

This feature adds a new "Mentorías Avanzadas" (Advanced Mentoring) section to the existing "Formación" (Training) dropdown menu in the website navigation. This will provide users with access to advanced mentoring services alongside the existing basic mentoring option.

## Requirements

### Requirement 1

**User Story:** As a website visitor, I want to see an "Mentorías Avanzadas" option in the Formación menu, so that I can access advanced mentoring services.

#### Acceptance Criteria

1. WHEN a user hovers over or clicks the "Formación" dropdown menu THEN the system SHALL display "Mentorías Avanzadas" as a new menu item
2. WHEN a user clicks on "Mentorías Avanzadas" THEN the system SHALL navigate to "/formacion/mentorias-avanzadas"
3. WHEN the dropdown menu is displayed THEN the system SHALL show both "Mentorías" and "Mentorías Avanzadas" options in a logical order

### Requirement 2

**User Story:** As a website visitor, I want the "Mentorías Avanzadas" page to exist and be accessible, so that I can learn about advanced mentoring services.

#### Acceptance Criteria

1. WHEN a user navigates to "/formacion/mentorias-avanzadas" THEN the system SHALL display a dedicated page for advanced mentoring
2. WHEN the page loads THEN the system SHALL display appropriate content about advanced mentoring services
3. WHEN the user is on the "Mentorías Avanzadas" page THEN the system SHALL highlight the corresponding menu item as active

### Requirement 3

**User Story:** As a potential mentoring client, I want to see detailed information about the Coding Pit mentoring service, so that I can understand the value proposition and decide to book a session.

#### Acceptance Criteria

1. WHEN the page loads THEN the system SHALL display a hero section with the main text "Coding Pit: tu espacio para crecer como programador" and subtitle about personalized mentoring
2. WHEN the page loads THEN the system SHALL display a prominent call-to-action button "👉 Reserva tu primera sesión gratuita"
3. WHEN the page loads THEN the system SHALL display a "¿Por qué una mentoría?" section explaining the benefits of mentoring
4. WHEN the page loads THEN the system SHALL display a "¿Para quién es Coding Pit?" section targeting different user types
5. WHEN the page loads THEN the system SHALL display a "Cómo funciona" section with a 4-step process explanation
6. WHEN the page loads THEN the system SHALL display a testimonials section (placeholder for future content)
7. WHEN the page loads THEN the system SHALL display a closing call-to-action section with final encouragement

### Requirement 4

**User Story:** As a website visitor, I want the navigation to remain accessible and functional, so that I can navigate the site using keyboard or screen readers.

#### Acceptance Criteria

1. WHEN a user navigates the menu using keyboard THEN the system SHALL allow access to the new "Mentorías Avanzadas" item using arrow keys
2. WHEN a screen reader user accesses the dropdown THEN the system SHALL announce the new menu item appropriately
3. WHEN the dropdown menu is expanded THEN the system SHALL maintain proper ARIA attributes for accessibility

### Requirement 5

**User Story:** As a website visitor, I want the menu styling to be consistent, so that the new option looks integrated with the existing design.

#### Acceptance Criteria

1. WHEN the dropdown menu is displayed THEN the system SHALL apply consistent styling to the new "Mentorías Avanzadas" item
2. WHEN a user hovers over the new menu item THEN the system SHALL display the same hover effects as other menu items
3. WHEN the menu is viewed on mobile devices THEN the system SHALL display the new item with proper responsive styling