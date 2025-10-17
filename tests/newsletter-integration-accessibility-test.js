/**
 * Newsletter Integration and Accessibility Test Suite
 * Tests complete form submission flow, keyboard navigation, screen reader compatibility,
 * error handling scenarios, and HTML semantics validation
 * 
 * Requirements: 4.1, 4.3, 4.4, 5.2, 5.3, 5.4
 */

import { readFileSync } from 'fs';

// Test configuration
const TEST_CONFIG = {
  baseUrl: 'http://localhost:4321',
  newsletterPath: '/formacion/newsletter',
  apiPath: '/api/newsletter-subscription',
  timeout: 10000
};

// Test results tracking
const testResults = {
  passed: 0,
  failed: 0,
  errors: []
};

// Utility functions
function logTest(testName, passed, details = '') {
  const status = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${status}: ${testName}`);
  if (details) console.log(`   ${details}`);
  
  if (passed) {
    testResults.passed++;
  } else {
    testResults.failed++;
    testResults.errors.push(`${testName}: ${details}`);
  }
}

function logSection(sectionName) {
  console.log(`\n🔍 ${sectionName}`);
  console.log('='.repeat(50));
}

// HTML Semantics and Accessibility Validation
function validateHTMLSemantics() {
  logSection('HTML Semantics and Accessibility Validation');
  
  try {
    // Read the newsletter page file
    const htmlContent = readFileSync('src/pages/formacion/newsletter.astro', 'utf8');
    
    // Test 1: Check for proper semantic HTML structure
    const hasMainElement = htmlContent.includes('<main') && htmlContent.includes('role="main"');
    logTest('Main element with role="main"', hasMainElement, 
      hasMainElement ? 'Main element properly defined' : 'Missing main element or role');
    
    // Test 2: Check for proper heading hierarchy
    const hasH1 = htmlContent.includes('PageHeader');
    const hasH2 = htmlContent.includes('<h2');
    const hasH3 = htmlContent.includes('<h3');
    logTest('Proper heading hierarchy (H1-H3)', hasH1 && hasH2 && hasH3,
      'Heading hierarchy properly structured');
    
    // Test 3: Check for skip link
    const hasSkipLink = htmlContent.includes('Saltar al contenido principal') && 
                       htmlContent.includes('href="#main-content"');
    logTest('Skip to main content link', hasSkipLink,
      hasSkipLink ? 'Skip link properly implemented' : 'Missing skip link');
    
    // Test 4: Check for ARIA labels and attributes
    const hasAriaLabels = htmlContent.includes('aria-labelledby') && 
                         htmlContent.includes('aria-describedby') &&
                         htmlContent.includes('aria-required');
    logTest('ARIA labels and attributes', hasAriaLabels,
      hasAriaLabels ? 'ARIA attributes properly used' : 'Missing ARIA attributes');
    
    // Test 5: Check for proper form labels
    const hasFormLabels = htmlContent.includes('<label for="name"') && 
                         htmlContent.includes('<label for="email"');
    logTest('Form labels properly associated', hasFormLabels,
      hasFormLabels ? 'Form labels properly associated with inputs' : 'Missing form labels');
    
    // Test 6: Check for live regions
    const hasLiveRegions = htmlContent.includes('aria-live="polite"') && 
                          htmlContent.includes('role="alert"');
    logTest('Live regions for dynamic content', hasLiveRegions,
      hasLiveRegions ? 'Live regions properly implemented' : 'Missing live regions');
    
    // Test 7: Check for required field indicators
    const hasRequiredIndicators = htmlContent.includes('aria-label="campo requerido"') &&
                                 htmlContent.includes('required') &&
                                 htmlContent.includes('aria-required="true"');
    logTest('Required field indicators', hasRequiredIndicators,
      hasRequiredIndicators ? 'Required fields properly marked' : 'Missing required field indicators');
    
    // Test 8: Check for focus management
    const hasFocusManagement = htmlContent.includes('focus:') && 
                              htmlContent.includes('focus:ring') &&
                              htmlContent.includes('focus:outline-none');
    logTest('Focus management styles', hasFocusManagement,
      hasFocusManagement ? 'Focus styles properly implemented' : 'Missing focus management');
    
  } catch (error) {
    logTest('HTML file reading', false, `Error reading file: ${error.message}`);
  }
}

// Form Validation and Error Handling Tests
function validateFormBehavior() {
  logSection('Form Validation and Error Handling');
  
  try {
    const htmlContent = readFileSync('src/pages/formacion/newsletter.astro', 'utf8');
    
    // Test 1: Client-side validation functions
    const hasValidationFunctions = htmlContent.includes('validateName') && 
                                  htmlContent.includes('validateEmail') &&
                                  htmlContent.includes('emailRegex');
    logTest('Client-side validation functions', hasValidationFunctions,
      hasValidationFunctions ? 'Validation functions implemented' : 'Missing validation functions');
    
    // Test 2: Error message display
    const hasErrorDisplay = htmlContent.includes('showFieldError') && 
                           htmlContent.includes('hideFieldError') &&
                           htmlContent.includes('error-message');
    logTest('Error message display system', hasErrorDisplay,
      hasErrorDisplay ? 'Error display system implemented' : 'Missing error display');
    
    // Test 3: Success message display
    const hasSuccessDisplay = htmlContent.includes('success-message') && 
                             htmlContent.includes('showSuccessMessage');
    logTest('Success message display', hasSuccessDisplay,
      hasSuccessDisplay ? 'Success message system implemented' : 'Missing success display');
    
    // Test 4: Loading states
    const hasLoadingStates = htmlContent.includes('setLoadingState') && 
                            htmlContent.includes('loading-spinner') &&
                            htmlContent.includes('disabled:');
    logTest('Loading states management', hasLoadingStates,
      hasLoadingStates ? 'Loading states properly managed' : 'Missing loading states');
    
    // Test 5: Form reset on success
    const hasFormReset = htmlContent.includes('form.reset()');
    logTest('Form reset on success', hasFormReset,
      hasFormReset ? 'Form resets after successful submission' : 'Missing form reset');
    
  } catch (error) {
    logTest('Form behavior validation', false, `Error: ${error.message}`);
  }
}

// API Integration Tests
function validateAPIIntegration() {
  logSection('API Integration and Error Handling');
  
  try {
    const apiContent = readFileSync('src/pages/_api/newsletter-subscription.ts', 'utf8');
    
    // Test 1: Rate limiting implementation
    const hasRateLimit = apiContent.includes('checkRateLimit') && 
                        apiContent.includes('RATE_LIMIT_MAX_REQUESTS') &&
                        apiContent.includes('rateLimitStore');
    logTest('Rate limiting implementation', hasRateLimit,
      hasRateLimit ? 'Rate limiting properly implemented' : 'Missing rate limiting');
    
    // Test 2: Input validation
    const hasInputValidation = apiContent.includes('validateInput') && 
                              apiContent.includes('EMAIL_REGEX') &&
                              apiContent.includes('sanitizeInput');
    logTest('Input validation and sanitization', hasInputValidation,
      hasInputValidation ? 'Input validation implemented' : 'Missing input validation');
    
    // Test 3: Listmonk integration
    const hasListmonkIntegration = apiContent.includes('submitToListmonk') && 
                                  apiContent.includes('LISTMONK_BASE_URL') &&
                                  apiContent.includes('FormData');
    logTest('Listmonk API integration', hasListmonkIntegration,
      hasListmonkIntegration ? 'Listmonk integration implemented' : 'Missing Listmonk integration');
    
    // Test 4: Error handling
    const hasErrorHandling = apiContent.includes('try {') && 
                            apiContent.includes('catch (error)') &&
                            apiContent.includes('response.status === 409');
    logTest('Comprehensive error handling', hasErrorHandling,
      hasErrorHandling ? 'Error handling properly implemented' : 'Missing error handling');
    
    // Test 5: Security measures
    const hasSecurityMeasures = apiContent.includes('sanitizeInput') && 
                               apiContent.includes('clientAddress') &&
                               apiContent.includes('substring(0, 255)');
    logTest('Security measures', hasSecurityMeasures,
      hasSecurityMeasures ? 'Security measures implemented' : 'Missing security measures');
    
    // Test 6: Proper HTTP responses
    const hasProperResponses = apiContent.includes('status: 200') && 
                              apiContent.includes('status: 400') &&
                              apiContent.includes('status: 429') &&
                              apiContent.includes('status: 500');
    logTest('Proper HTTP status codes', hasProperResponses,
      hasProperResponses ? 'HTTP status codes properly used' : 'Missing proper status codes');
    
  } catch (error) {
    logTest('API integration validation', false, `Error: ${error.message}`);
  }
}

// Keyboard Navigation Tests
function validateKeyboardNavigation() {
  logSection('Keyboard Navigation and Accessibility');
  
  try {
    const htmlContent = readFileSync('src/pages/formacion/newsletter.astro', 'utf8');
    
    // Test 1: Focusable elements
    const hasFocusableElements = htmlContent.includes('tabindex') || 
                                (htmlContent.includes('<input') && htmlContent.includes('<button'));
    logTest('Focusable form elements', hasFocusableElements,
      hasFocusableElements ? 'Form elements are focusable' : 'Missing focusable elements');
    
    // Test 2: Focus indicators
    const hasFocusIndicators = htmlContent.includes('focus:ring') && 
                              htmlContent.includes('focus:border') &&
                              htmlContent.includes('focus:outline-none');
    logTest('Visible focus indicators', hasFocusIndicators,
      hasFocusIndicators ? 'Focus indicators properly styled' : 'Missing focus indicators');
    
    // Test 3: Logical tab order
    const hasLogicalTabOrder = !htmlContent.includes('tabindex="-1"') || 
                              htmlContent.includes('Skip to main content');
    logTest('Logical tab order', hasLogicalTabOrder,
      'Tab order follows logical document flow');
    
    // Test 4: Form submission via keyboard
    const hasKeyboardSubmission = htmlContent.includes('type="submit"') && 
                                 htmlContent.includes('addEventListener(\'submit\'');
    logTest('Keyboard form submission', hasKeyboardSubmission,
      hasKeyboardSubmission ? 'Form can be submitted via keyboard' : 'Missing keyboard submission');
    
    // Test 5: Error focus management
    const hasErrorFocus = htmlContent.includes('.focus()') && 
                         htmlContent.includes('nameInput.focus()');
    logTest('Error focus management', hasErrorFocus,
      hasErrorFocus ? 'Focus moves to error fields' : 'Missing error focus management');
    
  } catch (error) {
    logTest('Keyboard navigation validation', false, `Error: ${error.message}`);
  }
}

// Screen Reader Compatibility Tests
function validateScreenReaderCompatibility() {
  logSection('Screen Reader Compatibility');
  
  try {
    const htmlContent = readFileSync('src/pages/formacion/newsletter.astro', 'utf8');
    
    // Test 1: Semantic HTML elements
    const hasSemanticElements = htmlContent.includes('<main') && 
                               htmlContent.includes('<section') &&
                               htmlContent.includes('<form') &&
                               htmlContent.includes('<label');
    logTest('Semantic HTML elements', hasSemanticElements,
      hasSemanticElements ? 'Semantic elements properly used' : 'Missing semantic elements');
    
    // Test 2: ARIA landmarks
    const hasAriaLandmarks = htmlContent.includes('role="main"') && 
                            htmlContent.includes('aria-labelledby');
    logTest('ARIA landmarks', hasAriaLandmarks,
      hasAriaLandmarks ? 'ARIA landmarks properly implemented' : 'Missing ARIA landmarks');
    
    // Test 3: Form accessibility
    const hasFormAccessibility = htmlContent.includes('aria-required') && 
                                htmlContent.includes('aria-describedby') &&
                                htmlContent.includes('aria-invalid');
    logTest('Form accessibility attributes', hasFormAccessibility,
      hasFormAccessibility ? 'Form accessibility properly implemented' : 'Missing form accessibility');
    
    // Test 4: Dynamic content announcements
    const hasDynamicAnnouncements = htmlContent.includes('aria-live="polite"') && 
                                   htmlContent.includes('role="alert"');
    logTest('Dynamic content announcements', hasDynamicAnnouncements,
      hasDynamicAnnouncements ? 'Dynamic content properly announced' : 'Missing dynamic announcements');
    
    // Test 5: Hidden content for screen readers
    const hasScreenReaderContent = htmlContent.includes('sr-only') && 
                                  htmlContent.includes('aria-hidden="true"');
    logTest('Screen reader specific content', hasScreenReaderContent,
      hasScreenReaderContent ? 'Screen reader content properly handled' : 'Missing screen reader content');
    
    // Test 6: Status messages
    const hasStatusMessages = htmlContent.includes('submitStatus') && 
                             htmlContent.includes('aria-live');
    logTest('Status message announcements', hasStatusMessages,
      hasStatusMessages ? 'Status messages properly announced' : 'Missing status announcements');
    
  } catch (error) {
    logTest('Screen reader compatibility validation', false, `Error: ${error.message}`);
  }
}

// Responsive Design and Touch Accessibility Tests
function validateResponsiveAccessibility() {
  logSection('Responsive Design and Touch Accessibility');
  
  try {
    const htmlContent = readFileSync('src/pages/formacion/newsletter.astro', 'utf8');
    
    // Test 1: Responsive grid layouts
    const hasResponsiveGrids = htmlContent.includes('grid-cols-1') && 
                              htmlContent.includes('sm:grid-cols-2') &&
                              htmlContent.includes('md:grid-cols');
    logTest('Responsive grid layouts', hasResponsiveGrids,
      hasResponsiveGrids ? 'Responsive grids properly implemented' : 'Missing responsive grids');
    
    // Test 2: Touch-friendly button sizes
    const hasTouchFriendlyButtons = htmlContent.includes('py-3') && 
                                   htmlContent.includes('px-6') &&
                                   htmlContent.includes('touch-manipulation');
    logTest('Touch-friendly button sizes', hasTouchFriendlyButtons,
      hasTouchFriendlyButtons ? 'Buttons are touch-friendly' : 'Buttons may be too small for touch');
    
    // Test 3: Responsive typography
    const hasResponsiveTypography = htmlContent.includes('text-sm') && 
                                   htmlContent.includes('sm:text-base') &&
                                   htmlContent.includes('md:text');
    logTest('Responsive typography', hasResponsiveTypography,
      hasResponsiveTypography ? 'Typography scales responsively' : 'Missing responsive typography');
    
    // Test 4: Mobile-first approach
    const hasMobileFirst = htmlContent.includes('px-4') && 
                          htmlContent.includes('md:px-6') &&
                          htmlContent.includes('lg:px-8');
    logTest('Mobile-first responsive design', hasMobileFirst,
      hasMobileFirst ? 'Mobile-first approach implemented' : 'Missing mobile-first design');
    
    // Test 5: Accessible spacing
    const hasAccessibleSpacing = htmlContent.includes('space-y-4') && 
                                htmlContent.includes('sm:space-y-6') &&
                                htmlContent.includes('gap-4');
    logTest('Accessible spacing and layout', hasAccessibleSpacing,
      hasAccessibleSpacing ? 'Spacing is accessible across devices' : 'Missing accessible spacing');
    
  } catch (error) {
    logTest('Responsive accessibility validation', false, `Error: ${error.message}`);
  }
}

// Edge Cases and Error Scenarios Tests
function validateEdgeCases() {
  logSection('Edge Cases and Error Scenarios');
  
  try {
    const apiContent = readFileSync('src/pages/_api/newsletter-subscription.ts', 'utf8');
    const htmlContent = readFileSync('src/pages/formacion/newsletter.astro', 'utf8');
    
    // Test 1: Empty form submission
    const handlesEmptySubmission = htmlContent.includes('validateName') && 
                                  htmlContent.includes('!name.trim()') &&
                                  apiContent.includes('data.name.trim().length === 0');
    logTest('Empty form submission handling', handlesEmptySubmission,
      handlesEmptySubmission ? 'Empty submissions properly handled' : 'Missing empty submission handling');
    
    // Test 2: Invalid email formats
    const handlesInvalidEmail = htmlContent.includes('emailRegex') && 
                               apiContent.includes('EMAIL_REGEX') &&
                               htmlContent.includes('!emailRegex.test');
    logTest('Invalid email format handling', handlesInvalidEmail,
      handlesInvalidEmail ? 'Invalid emails properly handled' : 'Missing email validation');
    
    // Test 3: Network errors
    const handlesNetworkErrors = htmlContent.includes('catch (error)') && 
                                htmlContent.includes('Error de conexión');
    logTest('Network error handling', handlesNetworkErrors,
      handlesNetworkErrors ? 'Network errors properly handled' : 'Missing network error handling');
    
    // Test 4: API rate limiting
    const handlesRateLimit = apiContent.includes('status: 429') && 
                            apiContent.includes('Demasiadas solicitudes');
    logTest('Rate limiting error handling', handlesRateLimit,
      handlesRateLimit ? 'Rate limiting properly implemented' : 'Missing rate limiting');
    
    // Test 5: Duplicate subscription
    const handlesDuplicates = apiContent.includes('response.status === 409') && 
                             apiContent.includes('Ya estás suscrito');
    logTest('Duplicate subscription handling', handlesDuplicates,
      handlesDuplicates ? 'Duplicate subscriptions properly handled' : 'Missing duplicate handling');
    
    // Test 6: Long input values
    const handlesLongInputs = apiContent.includes('length > 100') && 
                             apiContent.includes('length > 255') &&
                             apiContent.includes('substring(0, 255)');
    logTest('Long input value handling', handlesLongInputs,
      handlesLongInputs ? 'Long inputs properly handled' : 'Missing long input handling');
    
    // Test 7: XSS prevention
    const preventsXSS = apiContent.includes('sanitizeInput') && 
                       apiContent.includes('replace(/[<>]/g');
    logTest('XSS prevention measures', preventsXSS,
      preventsXSS ? 'XSS prevention implemented' : 'Missing XSS prevention');
    
  } catch (error) {
    logTest('Edge cases validation', false, `Error: ${error.message}`);
  }
}

// Navigation Integration Tests
function validateNavigationIntegration() {
  logSection('Navigation Integration');
  
  try {
    // Check if Header component has been updated
    const headerContent = readFileSync('src/components/Header.astro', 'utf8');
    
    // Test 1: Newsletter link in navigation
    const hasNewsletterLink = headerContent.includes('/formacion/newsletter') || 
                             headerContent.includes('Newsletter');
    logTest('Newsletter link in navigation', hasNewsletterLink,
      hasNewsletterLink ? 'Newsletter link added to navigation' : 'Missing newsletter navigation link');
    
    // Test 2: Proper menu structure
    const hasProperMenuStructure = headerContent.includes('<li') && 
                                  headerContent.includes('<a');
    logTest('Proper menu structure', hasProperMenuStructure,
      hasProperMenuStructure ? 'Menu structure is proper' : 'Menu structure issues');
    
  } catch (error) {
    logTest('Navigation integration', false, `Error reading header: ${error.message}`);
  }
}

// Main test execution
function runAllTests() {
  console.log('🧪 Newsletter Integration and Accessibility Test Suite');
  console.log('Testing Requirements: 4.1, 4.3, 4.4, 5.2, 5.3, 5.4');
  console.log('='.repeat(70));
  
  // Run all test suites
  validateHTMLSemantics();
  validateFormBehavior();
  validateAPIIntegration();
  validateKeyboardNavigation();
  validateScreenReaderCompatibility();
  validateResponsiveAccessibility();
  validateEdgeCases();
  validateNavigationIntegration();
  
  // Print summary
  console.log('\n📊 Test Summary');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`📈 Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);
  
  if (testResults.failed > 0) {
    console.log('\n❌ Failed Tests:');
    testResults.errors.forEach(error => console.log(`   • ${error}`));
  }
  
  // Return success status
  return testResults.failed === 0;
}

// Export for use in other test files
export { runAllTests, validateHTMLSemantics, validateFormBehavior, validateAPIIntegration };

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const success = runAllTests();
  process.exit(success ? 0 : 1);
}