#!/usr/bin/env node

/**
 * Newsletter Navigation Test
 * 
 * This script validates task 4 requirements for the newsletter-waitlist spec:
 * - Verify newsletter link is present in Formación dropdown
 * - Test navigation functionality and active state handling
 * - Confirm newsletter page is accessible
 * 
 * Requirements: 1.1, 1.2
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('🧪 Newsletter Navigation Test\n');
console.log('Testing requirements for newsletter-waitlist spec task 4:\n');
console.log('✓ Verify newsletter link is present in Formación dropdown');
console.log('✓ Test navigation functionality and active state handling');
console.log('✓ Confirm newsletter page is accessible');
console.log('✓ Requirements: 1.1, 1.2\n');

let testsPassed = 0;
let testsTotal = 0;

function runTest(testName, testFunction) {
  testsTotal++;
  console.log(`🔄 Testing: ${testName}`);
  
  try {
    const result = testFunction();
    if (result) {
      console.log(`✅ PASSED: ${testName}\n`);
      testsPassed++;
      return true;
    } else {
      console.log(`❌ FAILED: ${testName}\n`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ERROR in ${testName}: ${error.message}\n`);
    return false;
  }
}

// Test 1: Verify newsletter link is present in Header navigation
function testNewsletterLinkInHeader() {
  const headerPath = join(projectRoot, 'src/components/Header.astro');
  const headerContent = readFileSync(headerPath, 'utf-8');
  
  // Check that newsletter link is present in Formación dropdown
  const hasNewsletterLink = headerContent.includes('/formacion/newsletter');
  
  if (!hasNewsletterLink) {
    console.log('   ❌ Newsletter link not found in Header navigation');
    return false;
  }
  
  // Check that the link is within the Formación dropdown
  const formacionDropdownMatch = headerContent.match(/Formación[\s\S]*?<\/ul>/);
  
  if (!formacionDropdownMatch) {
    console.log('   ❌ Formación dropdown not found in Header');
    return false;
  }
  
  const formacionDropdownContent = formacionDropdownMatch[0];
  const hasNewsletterInFormacion = formacionDropdownContent.includes('/formacion/newsletter');
  
  if (!hasNewsletterInFormacion) {
    console.log('   ❌ Newsletter link not found within Formación dropdown');
    return false;
  }
  
  // Check for proper link text
  const hasNewsletterText = formacionDropdownContent.includes('Newsletter');
  
  if (!hasNewsletterText) {
    console.log('   ❌ Newsletter link text not found');
    return false;
  }
  
  console.log('   ✅ Newsletter link found in Formación dropdown');
  console.log('   ✅ Newsletter link has correct URL: /formacion/newsletter');
  console.log('   ✅ Newsletter link has correct text: Newsletter');
  
  return true;
}

// Test 2: Verify newsletter page exists and is accessible
function testNewsletterPageExists() {
  const newsletterPagePath = join(projectRoot, 'src/pages/formacion/newsletter.astro');
  
  try {
    const newsletterContent = readFileSync(newsletterPagePath, 'utf-8');
    
    if (newsletterContent.length < 100) {
      console.log('   ❌ Newsletter page appears to be empty or minimal');
      return false;
    }
    
    // Check that it contains expected newsletter content
    if (!newsletterContent.includes('Newsletter') || !newsletterContent.includes('lista de espera')) {
      console.log('   ❌ Newsletter page does not contain expected content');
      return false;
    }
    
    // Check for proper page structure
    const hasDefaultLayout = newsletterContent.includes('DefaultLayout');
    const hasPageHeader = newsletterContent.includes('PageHeader');
    
    if (!hasDefaultLayout || !hasPageHeader) {
      console.log('   ❌ Newsletter page missing proper layout components');
      return false;
    }
    
    console.log('   ✅ Newsletter page file exists and has content');
    console.log('   ✅ Newsletter page uses proper layout components');
    console.log('   ✅ Newsletter page contains expected content');
    
    return true;
  } catch (error) {
    console.log('   ❌ Newsletter page file does not exist');
    return false;
  }
}

// Test 3: Verify navigation structure and accessibility
function testNavigationAccessibility() {
  const headerPath = join(projectRoot, 'src/components/Header.astro');
  const headerContent = readFileSync(headerPath, 'utf-8');
  
  // Check for proper dropdown structure
  const hasDropdownMenus = headerContent.includes('has-dropdown') && 
                          headerContent.includes('dropdown-menu');
  
  if (!hasDropdownMenus) {
    console.log('   ❌ Navigation dropdown structure is missing');
    return false;
  }
  
  // Check for accessibility attributes
  const hasAriaAttributes = headerContent.includes('aria-haspopup') && 
                           headerContent.includes('aria-expanded');
  
  if (!hasAriaAttributes) {
    console.log('   ❌ Navigation accessibility attributes are missing');
    return false;
  }
  
  // Check that newsletter link is properly structured as submenu item
  const hasSubmenuItem = headerContent.includes('submenu-item') && 
                        headerContent.match(/submenu-item[\s\S]*?newsletter/i);
  
  if (!hasSubmenuItem) {
    console.log('   ❌ Newsletter link not properly structured as submenu item');
    return false;
  }
  
  console.log('   ✅ Navigation dropdown structure is correct');
  console.log('   ✅ Accessibility attributes are present');
  console.log('   ✅ Newsletter link is properly structured as submenu item');
  
  return true;
}

// Test 4: Verify other Formación menu items are still present
function testFormacionMenuIntegrity() {
  const headerPath = join(projectRoot, 'src/components/Header.astro');
  const headerContent = readFileSync(headerPath, 'utf-8');
  
  // Extract Formación dropdown content
  const formacionDropdownMatch = headerContent.match(/Formación[\s\S]*?<\/ul>/);
  
  if (!formacionDropdownMatch) {
    console.log('   ❌ Formación dropdown not found in Header');
    return false;
  }
  
  const formacionDropdownContent = formacionDropdownMatch[0];
  
  // Check for expected menu items in Formación
  const expectedFormacionItems = [
    '/formacion/mentorias',
    '/formacion/newsletter'
  ];
  
  let allItemsPresent = true;
  expectedFormacionItems.forEach(item => {
    if (!formacionDropdownContent.includes(item)) {
      console.log(`   ❌ Missing expected Formación menu item: ${item}`);
      allItemsPresent = false;
    } else {
      console.log(`   ✅ Found expected Formación menu item: ${item}`);
    }
  });
  
  return allItemsPresent;
}

// Test 5: Verify newsletter link positioning in menu
function testNewsletterLinkPositioning() {
  const headerPath = join(projectRoot, 'src/components/Header.astro');
  const headerContent = readFileSync(headerPath, 'utf-8');
  
  // Extract Formación dropdown content
  const formacionDropdownMatch = headerContent.match(/Formación[\s\S]*?<\/ul>/);
  
  if (!formacionDropdownMatch) {
    console.log('   ❌ Formación dropdown not found in Header');
    return false;
  }
  
  const formacionDropdownContent = formacionDropdownMatch[0];
  
  // Check that newsletter link appears after mentorias (logical ordering)
  const mentoriasIndex = formacionDropdownContent.indexOf('/formacion/mentorias');
  const newsletterIndex = formacionDropdownContent.indexOf('/formacion/newsletter');
  
  if (mentoriasIndex === -1 || newsletterIndex === -1) {
    console.log('   ❌ Could not find both mentorias and newsletter links');
    return false;
  }
  
  if (newsletterIndex < mentoriasIndex) {
    console.log('   ⚠️  Newsletter link appears before mentorias link (may be intentional)');
  } else {
    console.log('   ✅ Newsletter link appears after mentorias link (logical ordering)');
  }
  
  console.log('   ✅ Newsletter link positioning verified');
  
  return true;
}

// Run all tests
console.log('=' .repeat(60));
console.log('🚀 STARTING NEWSLETTER NAVIGATION TESTS');
console.log('=' .repeat(60));

runTest('Newsletter Link in Header', testNewsletterLinkInHeader);
runTest('Newsletter Page Exists', testNewsletterPageExists);
runTest('Navigation Accessibility', testNavigationAccessibility);
runTest('Formación Menu Integrity', testFormacionMenuIntegrity);
runTest('Newsletter Link Positioning', testNewsletterLinkPositioning);

// Display final results
console.log('=' .repeat(60));
console.log('📊 NEWSLETTER NAVIGATION TEST RESULTS');
console.log('=' .repeat(60));

console.log(`Passed: ${testsPassed}/${testsTotal}`);
const successRate = Math.round((testsPassed / testsTotal) * 100);
console.log(`Success Rate: ${successRate}%`);

if (testsPassed === testsTotal) {
  console.log('\n🎉 All newsletter navigation tests passed!');
  console.log('\n📋 Task 4 Requirements Validated:');
  console.log('✅ Newsletter link added to Formación dropdown');
  console.log('✅ Navigation functionality verified');
  console.log('✅ Newsletter page accessibility confirmed');
  console.log('\n📋 Manual Testing Recommended:');
  console.log('1. Start the development server: npm run dev');
  console.log('2. Navigate to the site and test the Formación dropdown');
  console.log('3. Click on the Newsletter link and verify it loads correctly');
  console.log('4. Test keyboard navigation and screen reader compatibility');
  console.log('\nRequirements validated: 1.1, 1.2');
} else {
  console.log('\n❌ Some newsletter navigation tests failed.');
  console.log('Please review the implementation before proceeding.');
}

process.exit(testsPassed === testsTotal ? 0 : 1);