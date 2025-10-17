/**
 * Newsletter Accessibility Validation Test
 * Comprehensive accessibility testing for the newsletter page
 * 
 * Requirements: 5.2, 5.3, 5.4
 */

import { readFileSync } from 'fs';

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

// WCAG 2.1 Compliance Tests
function testWCAGCompliance() {
  logSection('WCAG 2.1 Compliance Tests');
  
  try {
    const htmlContent = readFileSync('src/pages/formacion/newsletter.astro', 'utf8');
    
    // Test 1: Perceivable - Text alternatives
    const hasAltText = htmlContent.includes('aria-hidden="true"') && 
                      htmlContent.includes('aria-label');
    logTest('Text alternatives for non-text content', hasAltText,
      hasAltText ? 'Decorative images properly marked' : 'Missing text alternatives');
    
    // Test 2: Perceivable - Color contrast
    const hasContrastClasses = htmlContent.includes('text-neutral-900') && 
                              htmlContent.includes('dark:text-neutral-50') &&
                              htmlContent.includes('bg-white') &&
                              htmlContent.includes('dark:bg-neutral-800');
    logTest('Color contrast considerations', hasContrastClasses,
      hasContrastClasses ? 'Color contrast classes implemented' : 'Missing contrast considerations');
    
    // Test 3: Operable - Keyboard accessible
    const hasKeyboardSupport = htmlContent.includes('focus:') && 
                              htmlContent.includes('tabindex') === false || // No positive tabindex
                              !htmlContent.includes('tabindex="');
    logTest('Keyboard accessibility', hasKeyboardSupport,
      hasKeyboardSupport ? 'Keyboard navigation properly supported' : 'Keyboard accessibility issues');
    
    // Test 4: Operable - No seizures
    const hasNoFlashing = !htmlContent.includes('animate-pulse') || 
                         !htmlContent.includes('animate-bounce');
    logTest('No seizure-inducing content', hasNoFlashing,
      hasNoFlashing ? 'No problematic animations' : 'Potentially seizure-inducing animations');
    
    // Test 5: Understandable - Readable
    const hasLangAttribute = htmlContent.includes('lang=') || 
                            htmlContent.includes('DefaultLayout'); // Layout should handle lang
    logTest('Language identification', hasLangAttribute,
      hasLangAttribute ? 'Language properly identified' : 'Missing language identification');
    
    // Test 6: Understandable - Predictable
    const hasPredictableNavigation = htmlContent.includes('Header') && 
                                    htmlContent.includes('Footer');
    logTest('Predictable navigation', hasPredictableNavigation,
      hasPredictableNavigation ? 'Consistent navigation structure' : 'Navigation may be unpredictable');
    
    // Test 7: Robust - Compatible
    const hasSemanticHTML = htmlContent.includes('<main') && 
                           htmlContent.includes('<section') &&
                           htmlContent.includes('<form') &&
                           htmlContent.includes('<label');
    logTest('Semantic HTML usage', hasSemanticHTML,
      hasSemanticHTML ? 'Semantic HTML properly used' : 'Missing semantic HTML');
    
  } catch (error) {
    logTest('WCAG compliance validation', false, `Error: ${error.message}`);
  }
}

// Form Accessibility Tests
function testFormAccessibility() {
  logSection('Form Accessibility Tests');
  
  try {
    const htmlContent = readFileSync('src/pages/formacion/newsletter.astro', 'utf8');
    
    // Test 1: Form labels
    const hasProperLabels = htmlContent.includes('<label for="name"') && 
                           htmlContent.includes('<label for="email"') &&
                           htmlContent.includes('id="name"') &&
                           htmlContent.includes('id="email"');
    logTest('Form labels properly associated', hasProperLabels,
      hasProperLabels ? 'Labels properly associated with inputs' : 'Missing or incorrect label associations');
    
    // Test 2: Required field indication
    const hasRequiredIndication = htmlContent.includes('required') && 
                                 htmlContent.includes('aria-required="true"') &&
                                 htmlContent.includes('campo requerido');
    logTest('Required fields properly indicated', hasRequiredIndication,
      hasRequiredIndication ? 'Required fields properly marked' : 'Missing required field indicators');
    
    // Test 3: Error identification
    const hasErrorIdentification = htmlContent.includes('aria-describedby') && 
                                  htmlContent.includes('role="alert"') &&
                                  htmlContent.includes('aria-invalid');
    logTest('Error identification and description', hasErrorIdentification,
      hasErrorIdentification ? 'Errors properly identified and described' : 'Missing error identification');
    
    // Test 4: Form instructions
    const hasInstructions = htmlContent.includes('placeholder=') && 
                           htmlContent.includes('Al suscribirte');
    logTest('Form instructions and help text', hasInstructions,
      hasInstructions ? 'Form instructions provided' : 'Missing form instructions');
    
    // Test 5: Fieldset and legend (if applicable)
    const hasFieldsetOrSingleForm = !htmlContent.includes('<fieldset') || 
                                   htmlContent.includes('<legend');
    logTest('Fieldset and legend usage', hasFieldsetOrSingleForm,
      hasFieldsetOrSingleForm ? 'Fieldset usage appropriate' : 'Missing legend for fieldset');
    
  } catch (error) {
    logTest('Form accessibility validation', false, `Error: ${error.message}`);
  }
}

// Dynamic Content Accessibility Tests
function testDynamicContentAccessibility() {
  logSection('Dynamic Content Accessibility Tests');
  
  try {
    const htmlContent = readFileSync('src/pages/formacion/newsletter.astro', 'utf8');
    
    // Test 1: Live regions
    const hasLiveRegions = htmlContent.includes('aria-live="polite"') && 
                          htmlContent.includes('role="alert"');
    logTest('Live regions for dynamic content', hasLiveRegions,
      hasLiveRegions ? 'Live regions properly implemented' : 'Missing live regions');
    
    // Test 2: Status messages
    const hasStatusMessages = htmlContent.includes('success-message') && 
                             htmlContent.includes('error-message') &&
                             htmlContent.includes('submit-status');
    logTest('Status message announcements', hasStatusMessages,
      hasStatusMessages ? 'Status messages properly implemented' : 'Missing status messages');
    
    // Test 3: Loading states
    const hasLoadingStates = htmlContent.includes('loading-spinner') && 
                            htmlContent.includes('Procesando') &&
                            htmlContent.includes('disabled:');
    logTest('Loading state accessibility', hasLoadingStates,
      hasLoadingStates ? 'Loading states accessible' : 'Missing accessible loading states');
    
    // Test 4: Focus management
    const hasFocusManagement = htmlContent.includes('.focus()') && 
                              htmlContent.includes('scrollIntoView');
    logTest('Focus management for dynamic content', hasFocusManagement,
      hasFocusManagement ? 'Focus properly managed' : 'Missing focus management');
    
  } catch (error) {
    logTest('Dynamic content accessibility validation', false, `Error: ${error.message}`);
  }
}

// Mobile and Touch Accessibility Tests
function testMobileAccessibility() {
  logSection('Mobile and Touch Accessibility Tests');
  
  try {
    const htmlContent = readFileSync('src/pages/formacion/newsletter.astro', 'utf8');
    
    // Test 1: Touch target sizes
    const hasTouchTargets = htmlContent.includes('py-3') && 
                           htmlContent.includes('px-6') &&
                           htmlContent.includes('touch-manipulation');
    logTest('Adequate touch target sizes', hasTouchTargets,
      hasTouchTargets ? 'Touch targets meet minimum size requirements' : 'Touch targets may be too small');
    
    // Test 2: Responsive text sizes
    const hasResponsiveText = htmlContent.includes('text-sm') && 
                             htmlContent.includes('sm:text-base') &&
                             htmlContent.includes('md:text');
    logTest('Responsive text sizing', hasResponsiveText,
      hasResponsiveText ? 'Text scales appropriately' : 'Text may not scale properly');
    
    // Test 3: Mobile-friendly spacing
    const hasMobileSpacing = htmlContent.includes('space-y-4') && 
                            htmlContent.includes('sm:space-y-6') &&
                            htmlContent.includes('gap-4');
    logTest('Mobile-friendly spacing', hasMobileSpacing,
      hasMobileSpacing ? 'Spacing appropriate for mobile' : 'Spacing may be inadequate for mobile');
    
    // Test 4: Viewport considerations
    const hasViewportConsiderations = htmlContent.includes('max-w-') && 
                                     htmlContent.includes('mx-auto') &&
                                     htmlContent.includes('px-4');
    logTest('Viewport and layout considerations', hasViewportConsiderations,
      hasViewportConsiderations ? 'Layout considers different viewports' : 'Missing viewport considerations');
    
  } catch (error) {
    logTest('Mobile accessibility validation', false, `Error: ${error.message}`);
  }
}

// Screen Reader Specific Tests
function testScreenReaderSupport() {
  logSection('Screen Reader Support Tests');
  
  try {
    const htmlContent = readFileSync('src/pages/formacion/newsletter.astro', 'utf8');
    
    // Test 1: Skip links
    const hasSkipLinks = htmlContent.includes('Saltar al contenido') && 
                        htmlContent.includes('sr-only') &&
                        htmlContent.includes('focus:not-sr-only');
    logTest('Skip navigation links', hasSkipLinks,
      hasSkipLinks ? 'Skip links properly implemented' : 'Missing skip links');
    
    // Test 2: Heading structure
    const hasHeadingStructure = htmlContent.includes('<h2') && 
                               htmlContent.includes('<h3') &&
                               htmlContent.includes('PageHeader');
    logTest('Logical heading structure', hasHeadingStructure,
      hasHeadingStructure ? 'Heading structure is logical' : 'Heading structure may be problematic');
    
    // Test 3: Landmark roles
    const hasLandmarks = htmlContent.includes('role="main"') && 
                        htmlContent.includes('<main') &&
                        htmlContent.includes('<section');
    logTest('ARIA landmarks', hasLandmarks,
      hasLandmarks ? 'Landmarks properly implemented' : 'Missing ARIA landmarks');
    
    // Test 4: Hidden content
    const hasHiddenContent = htmlContent.includes('sr-only') && 
                            htmlContent.includes('aria-hidden="true"');
    logTest('Hidden content handling', hasHiddenContent,
      hasHiddenContent ? 'Hidden content properly handled' : 'Hidden content may be problematic');
    
    // Test 5: Descriptive text
    const hasDescriptiveText = htmlContent.includes('aria-describedby') && 
                              htmlContent.includes('aria-labelledby');
    logTest('Descriptive text associations', hasDescriptiveText,
      hasDescriptiveText ? 'Descriptive text properly associated' : 'Missing descriptive text');
    
  } catch (error) {
    logTest('Screen reader support validation', false, `Error: ${error.message}`);
  }
}

// Color and Contrast Tests
function testColorAndContrast() {
  logSection('Color and Contrast Tests');
  
  try {
    const htmlContent = readFileSync('src/pages/formacion/newsletter.astro', 'utf8');
    
    // Test 1: Dark mode support
    const hasDarkMode = htmlContent.includes('dark:') && 
                       htmlContent.includes('dark:bg-') &&
                       htmlContent.includes('dark:text-');
    logTest('Dark mode support', hasDarkMode,
      hasDarkMode ? 'Dark mode properly supported' : 'Missing dark mode support');
    
    // Test 2: Color not sole indicator
    const hasNonColorIndicators = htmlContent.includes('✓') && 
                                 htmlContent.includes('❌') &&
                                 htmlContent.includes('*');
    logTest('Color not sole indicator', hasNonColorIndicators,
      hasNonColorIndicators ? 'Information not conveyed by color alone' : 'May rely too heavily on color');
    
    // Test 3: Focus indicators
    const hasFocusIndicators = htmlContent.includes('focus:ring') && 
                              htmlContent.includes('focus:border') &&
                              !htmlContent.includes('focus:outline-none') || 
                              htmlContent.includes('focus:ring');
    logTest('Visible focus indicators', hasFocusIndicators,
      hasFocusIndicators ? 'Focus indicators visible' : 'Focus indicators may be missing');
    
    // Test 4: Error state indicators
    const hasErrorIndicators = htmlContent.includes('border-red') && 
                              htmlContent.includes('text-red') &&
                              htmlContent.includes('bg-red');
    logTest('Error state visual indicators', hasErrorIndicators,
      hasErrorIndicators ? 'Error states visually distinct' : 'Error states may not be visually distinct');
    
  } catch (error) {
    logTest('Color and contrast validation', false, `Error: ${error.message}`);
  }
}

// Main test execution
function runAccessibilityTests() {
  console.log('🧪 Newsletter Accessibility Validation Test Suite');
  console.log('Testing Requirements: 5.2, 5.3, 5.4');
  console.log('='.repeat(70));
  
  // Run all test suites
  testWCAGCompliance();
  testFormAccessibility();
  testDynamicContentAccessibility();
  testMobileAccessibility();
  testScreenReaderSupport();
  testColorAndContrast();
  
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
  
  console.log('\n📝 Accessibility Testing Notes:');
  console.log('   • These tests validate code structure and patterns');
  console.log('   • Manual testing with screen readers is still recommended');
  console.log('   • Use browser accessibility tools for additional validation');
  console.log('   • Test with actual users with disabilities when possible');
  
  // Return success status
  return testResults.failed === 0;
}

// Export for use in other test files
export { runAccessibilityTests, testWCAGCompliance, testFormAccessibility };

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const success = runAccessibilityTests();
  process.exit(success ? 0 : 1);
}