# Requirements Document

## Introduction

This feature involves cleaning up the website by removing all consultancy-related content from various pages and navigation elements, while also hiding the substack projects section from the user interface without deleting the underlying files.

## Requirements

### Requirement 1

**User Story:** As a website visitor, I want the consultancy sections removed from all pages so that the site focuses on the core offerings without consultancy services.

#### Acceptance Criteria

1. WHEN a user visits any page THEN the system SHALL NOT display any consultancy-related content or navigation links
2. WHEN a user browses the navigation menu THEN the system SHALL NOT show consultancy options
3. WHEN a user visits the projects section THEN the system SHALL NOT display consultancy as a project category

### Requirement 2

**User Story:** As a website visitor, I want the substack projects section to be hidden from view so that it doesn't appear in the projects listing while preserving the files for potential future use.

#### Acceptance Criteria

1. WHEN a user visits the projects section THEN the system SHALL NOT display the substack project option
2. WHEN a user navigates through project categories THEN the system SHALL NOT show substack as an available option
3. IF the substack files exist THEN the system SHALL preserve them without deletion
4. WHEN accessing the substack URL directly THEN the system SHALL still serve the content (files remain functional but hidden from navigation)

### Requirement 3

**User Story:** As a site maintainer, I want all references to consultancy removed from page content so that the messaging is consistent across the entire site.

#### Acceptance Criteria

1. WHEN reviewing page content THEN the system SHALL NOT contain any text references to consultancy services
2. WHEN checking component files THEN the system SHALL NOT include consultancy-related components or sections
3. WHEN examining navigation structures THEN the system SHALL NOT reference consultancy pages or sections