# Newsletter Manual Integration Test Guide

This guide provides step-by-step instructions for manually testing the complete newsletter subscription flow with the Listmonk API and accessibility features.

## Prerequisites

1. Ensure the development server is running: `npm run dev`
2. Verify Listmonk instance is accessible at: https://codingpit-listmonk.zeabur.app/
3. Have screen reader software available for testing (NVDA, JAWS, or VoiceOver)
4. Test on multiple browsers and devices

## Test Scenarios

### 1. Complete Form Submission Flow (Requirement 4.1)

#### Test Case 1.1: Successful Subscription
1. Navigate to `/formacion/newsletter`
2. Fill in valid name: "Test User"
3. Fill in valid email: "test@example.com"
4. Click "Unirme a la lista de espera"
5. **Expected**: Success message appears, form resets, confirmation email sent

#### Test Case 1.2: Duplicate Subscription
1. Use the same email from Test Case 1.1
2. Submit the form again
3. **Expected**: Error message "Ya estás suscrito a nuestra newsletter"

#### Test Case 1.3: Invalid Email Format
1. Enter name: "Test User"
2. Enter invalid email: "invalid-email"
3. Submit form
4. **Expected**: Client-side validation error appears

#### Test Case 1.4: Empty Fields
1. Leave both fields empty
2. Submit form
3. **Expected**: Validation errors for both fields appear

### 2. Keyboard Navigation Testing (Requirement 5.3)

#### Test Case 2.1: Tab Navigation
1. Load the newsletter page
2. Press Tab key repeatedly
3. **Expected**: Focus moves logically through:
   - Skip link (if focused)
   - Name input
   - Email input
   - Submit button
   - Other page elements

#### Test Case 2.2: Skip Link Functionality
1. Load the page
2. Press Tab once to focus skip link
3. Press Enter
4. **Expected**: Focus moves to main content area

#### Test Case 2.3: Form Submission via Keyboard
1. Fill in form fields using Tab and typing
2. Press Enter or Space on submit button
3. **Expected**: Form submits successfully

#### Test Case 2.4: Error Field Focus
1. Submit form with empty name field
2. **Expected**: Focus automatically moves to name input field

### 3. Screen Reader Compatibility (Requirement 5.4)

#### Test Case 3.1: Page Structure Announcement
1. Open page with screen reader active
2. Navigate through page structure (headings)
3. **Expected**: Screen reader announces:
   - Page title
   - Main heading
   - Section headings (H2, H3)
   - Proper heading hierarchy

#### Test Case 3.2: Form Field Announcements
1. Navigate to form fields with screen reader
2. **Expected**: Screen reader announces:
   - Field labels
   - Required field status
   - Field types (text, email)
   - Associated error messages

#### Test Case 3.3: Dynamic Content Announcements
1. Submit form with invalid data
2. **Expected**: Screen reader announces error messages
3. Submit form with valid data
4. **Expected**: Screen reader announces success message

#### Test Case 3.4: Loading State Announcements
1. Submit form and listen during processing
2. **Expected**: Screen reader announces "Enviando suscripción..." status

### 4. Error Handling Scenarios (Requirement 4.3, 4.4)

#### Test Case 4.1: Network Error Simulation
1. Disconnect internet or block API endpoint
2. Submit valid form data
3. **Expected**: Network error message appears

#### Test Case 4.2: API Server Error
1. If possible, simulate server error (500 status)
2. Submit form
3. **Expected**: Server error message appears

#### Test Case 4.3: Rate Limiting
1. Submit form 6 times rapidly from same IP
2. **Expected**: Rate limiting error after 5 submissions

#### Test Case 4.4: Malformed Data
1. Use browser dev tools to modify form data
2. Send malformed JSON to API
3. **Expected**: Proper error handling and user-friendly message

### 5. Responsive Design and Touch Accessibility (Requirement 5.2)

#### Test Case 5.1: Mobile Device Testing
1. Test on actual mobile device or browser dev tools
2. Verify form is usable on small screens
3. **Expected**: 
   - Form fields are appropriately sized
   - Buttons are touch-friendly (minimum 44px)
   - Text is readable without zooming

#### Test Case 5.2: Tablet Testing
1. Test on tablet or medium screen size
2. **Expected**: Layout adapts appropriately

#### Test Case 5.3: Desktop Testing
1. Test on large desktop screen
2. **Expected**: Content doesn't become too wide, maintains readability

### 6. HTML Semantics Validation (Requirement 5.3)

#### Test Case 6.1: HTML Validation
1. Use W3C HTML Validator on the page
2. **Expected**: No HTML validation errors

#### Test Case 6.2: ARIA Validation
1. Use accessibility testing tools (axe, WAVE)
2. **Expected**: No ARIA or accessibility violations

#### Test Case 6.3: Semantic Structure
1. Inspect page with accessibility tools
2. **Expected**: 
   - Proper landmark roles
   - Logical heading structure
   - Form labels properly associated

## Manual Testing Checklist

### Pre-Testing Setup
- [ ] Development server running
- [ ] Listmonk API accessible
- [ ] Screen reader software ready
- [ ] Multiple browsers available
- [ ] Mobile/tablet devices ready

### Form Functionality
- [ ] Valid form submission works
- [ ] Invalid email rejected
- [ ] Empty fields validated
- [ ] Duplicate subscription handled
- [ ] Success message displays
- [ ] Error messages display
- [ ] Form resets after success
- [ ] Loading states work

### Keyboard Navigation
- [ ] Tab order is logical
- [ ] Skip link works
- [ ] Form submittable via keyboard
- [ ] Focus indicators visible
- [ ] Error fields receive focus

### Screen Reader Testing
- [ ] Page structure announced
- [ ] Form fields properly labeled
- [ ] Required fields announced
- [ ] Error messages announced
- [ ] Success messages announced
- [ ] Loading states announced

### Responsive Design
- [ ] Mobile layout works
- [ ] Tablet layout works
- [ ] Desktop layout works
- [ ] Touch targets appropriate size
- [ ] Text readable on all sizes

### Error Handling
- [ ] Network errors handled
- [ ] Server errors handled
- [ ] Rate limiting works
- [ ] Invalid data handled
- [ ] User-friendly error messages

### API Integration
- [ ] Successful API calls
- [ ] Error responses handled
- [ ] Rate limiting enforced
- [ ] Input validation works
- [ ] Security measures active

## Test Results Documentation

For each test case, document:
- **Status**: Pass/Fail
- **Browser/Device**: Which browser and device used
- **Notes**: Any observations or issues
- **Screenshots**: If applicable

## Common Issues to Watch For

1. **Focus Management**: Ensure focus moves logically and is visible
2. **Error Messages**: Should be clear, helpful, and announced by screen readers
3. **Loading States**: Should provide feedback during form submission
4. **Mobile Usability**: Form should be easy to use on touch devices
5. **API Errors**: Should be handled gracefully with user-friendly messages

## Accessibility Tools Recommended

- **Browser Extensions**: axe DevTools, WAVE
- **Screen Readers**: NVDA (Windows), VoiceOver (Mac), TalkBack (Android)
- **Keyboard Testing**: Use only keyboard, no mouse
- **Color Contrast**: Check contrast ratios meet WCAG standards
- **Mobile Testing**: Real devices preferred over browser simulation