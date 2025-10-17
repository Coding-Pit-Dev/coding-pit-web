# Design Document

## Overview

The newsletter waitlist feature will add a new page under the formation submenu that allows users to subscribe to a newsletter managed by Listmonk. The implementation will follow the existing site patterns and integrate seamlessly with the current Astro architecture.

## Architecture

### Page Structure
- **Route**: `/formacion/newsletter` (Spanish: lista de espera)
- **Layout**: Uses the existing `DefaultLayout.astro` component
- **Components**: Leverages existing components like `PageHeader.astro` and follows the established styling patterns

### API Integration
- **Backend API**: New endpoint at `/api/newsletter-subscription`
- **External Service**: Listmonk instance at `https://codingpit-listmonk.zeabur.app/`
- **HTTP Method**: POST request to Listmonk's public subscription endpoint
- **Endpoint**: `/subscription/form` (standard Listmonk public subscription endpoint)

### Navigation Integration
- Add new menu item to the "Formación" dropdown in the header navigation
- Update `Header.astro` component to include the newsletter link

## Components and Interfaces

### 1. Newsletter Waitlist Page (`/src/pages/formacion/newsletter.astro`)

**Structure:**
- Page header with title and description
- Information section about the newsletter
- Subscription form
- Success/error message handling

**Form Fields:**
- Name (text input, required)
- Email (email input, required, validated)
- Submit button

**Styling:**
- Follows existing site design patterns
- Responsive layout using Tailwind CSS classes
- Consistent with other formation pages
- Accessible form design with proper labels and ARIA attributes

### 2. API Endpoint (`/src/pages/_api/newsletter-subscription.ts`)

**Interface:**
```typescript
interface SubscriptionRequest {
  name: string;
  email: string;
}

interface SubscriptionResponse {
  success: boolean;
  error?: string;
}
```

**Functionality:**
- Validates input data (name and email)
- Makes HTTP request to Listmonk API
- Handles success and error responses
- Returns appropriate JSON response

### 3. Navigation Update (`/src/components/Header.astro`)

**Changes:**
- Add new `<li>` item in the "Formación" dropdown
- Link to `/formacion/newsletter`
- Text: "Newsletter" or "Lista de espera"

## Data Models

### Subscription Form Data
```typescript
interface NewsletterSubscription {
  name: string;        // User's full name
  email: string;       // Valid email address
  lists?: string[];    // Optional: specific lists to subscribe to
}
```

### Listmonk API Request
```typescript
interface ListmonkSubscriptionRequest {
  email: string;
  name: string;
  lists: string[];     // Array of list UUIDs
}
```

## Error Handling

### Client-Side Validation
- **Empty fields**: Display inline validation messages
- **Invalid email**: Real-time email format validation
- **Form submission**: Disable submit button during processing

### Server-Side Error Handling
- **Network errors**: Handle connection failures to Listmonk
- **API errors**: Parse and display Listmonk error responses
- **Validation errors**: Return appropriate error messages
- **Rate limiting**: Handle potential rate limiting from Listmonk

### Error Messages (Spanish)
- "Por favor, completa todos los campos"
- "El formato del email no es válido"
- "Error al procesar la suscripción. Inténtalo de nuevo."
- "Ya estás suscrito a nuestra newsletter"

## Testing Strategy

### Unit Tests
- Form validation logic
- API endpoint functionality
- Error handling scenarios

### Integration Tests
- End-to-end form submission flow
- Listmonk API integration
- Navigation menu functionality

### Accessibility Tests
- Keyboard navigation
- Screen reader compatibility
- Form accessibility compliance

### Manual Testing
- Cross-browser compatibility
- Mobile responsiveness
- Form submission with various inputs

## Implementation Details

### Listmonk Integration
- **Public Subscription Form**: Use Listmonk's built-in public subscription endpoint
- **List Configuration**: Subscribe users to a default newsletter list
- **Double Opt-in**: Leverage Listmonk's built-in confirmation email system
- **API Authentication**: Public endpoint doesn't require authentication

### Content Strategy
The page will include:
- **Newsletter description**: What subscribers can expect
- **Frequency information**: How often emails are sent
- **Content preview**: Types of content included
- **Privacy information**: How email addresses are used
- **Benefits**: Why users should subscribe

### Responsive Design
- **Mobile-first approach**: Optimized for mobile devices
- **Form layout**: Single column on mobile, potentially two-column on desktop
- **Button sizing**: Touch-friendly button sizes
- **Typography**: Readable font sizes across devices

### Performance Considerations
- **Form submission**: Async handling with loading states
- **API calls**: Proper timeout handling
- **Client-side validation**: Immediate feedback without server round-trips
- **Progressive enhancement**: Works without JavaScript for basic functionality

## Security Considerations

### Input Validation
- Server-side validation of all inputs
- Email format validation
- XSS prevention through proper sanitization
- CSRF protection through Astro's built-in mechanisms

### API Security
- Rate limiting on the API endpoint
- Input sanitization before sending to Listmonk
- Proper error message handling (no sensitive information exposure)

### Privacy Compliance
- Clear privacy information on the form
- Compliance with GDPR/privacy regulations
- Secure transmission of data to Listmonk