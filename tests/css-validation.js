#!/usr/bin/env node

/**
 * CSS Validation Script for Dark Mode Only Implementation
 * 
 * This script validates the CSS changes without requiring a browser environment.
 * Tests Requirements: 2.1, 2.2, 2.3, 3.3
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('🧪 Running CSS Validation Tests for Dark Mode Only Implementation\n');

let testsPassed = 0;
let testsFailed = 0;

function test(description, testFn) {
  try {
    testFn();
    console.log(`✅ ${description}`);
    testsPassed++;
  } catch (error) {
    console.log(`❌ ${description}`);
    console.log(`   Error: ${error.message}`);
    testsFailed++;
  }
}

// Test 1: CSS Root Variables Validation
test('CSS root variables are properly configured for dark mode only', () => {
  const cssPath = join(projectRoot, 'src/assets/scss/base/_root.scss');
  if (!existsSync(cssPath)) {
    throw new Error('Root CSS file not found');
  }
  
  const cssContent = readFileSync(cssPath, 'utf-8');
  
  // Should not contain light-dark() functions
  if (cssContent.includes('light-dark(')) {
    throw new Error('CSS still contains light-dark() functions');
  }
  
  // Should have color-scheme set to dark
  if (!cssContent.includes('color-scheme: dark')) {
    throw new Error('color-scheme is not set to dark');
  }
  
  // Should have essential dark mode variables
  const requiredVariables = [
    '--foreground-color: var(--color-neutral-100)',
    '--background-color: var(--color-neutral-900)',
    '--icon-color: var(--color-neutral-100)'
  ];
  
  requiredVariables.forEach(variable => {
    if (!cssContent.includes(variable)) {
      throw new Error(`Missing required variable: ${variable}`);
    }
  });
});

// Test 2: Logo Component Validation
test('Logo component has proper background styling', () => {
  const logoPath = join(projectRoot, 'src/components/Logo.astro');
  if (!existsSync(logoPath)) {
    throw new Error('Logo component not found');
  }
  
  const logoContent = readFileSync(logoPath, 'utf-8');
  
  // Should have logo-container class
  if (!logoContent.includes('logo-container')) {
    throw new Error('Logo container class not found');
  }
  
  // Should have background styling
  const requiredStyles = [
    'background-color: var(--color-neutral-800)',
    'border: 1px solid var(--color-neutral-700)',
    'border-radius: var(--radius-s)',
    'padding: var(--space-2xs)'
  ];
  
  requiredStyles.forEach(style => {
    if (!logoContent.includes(style)) {
      throw new Error(`Missing required style: ${style}`);
    }
  });
});

// Test 3: Header Component Validation
test('Header component does not contain dark mode toggle', () => {
  const headerPath = join(projectRoot, 'src/components/Header.astro');
  if (!existsSync(headerPath)) {
    throw new Error('Header component not found');
  }
  
  const headerContent = readFileSync(headerPath, 'utf-8');
  
  // Should not import DarkMode component
  if (headerContent.includes('DarkMode')) {
    throw new Error('Header still contains DarkMode component reference');
  }
  
  // Should not have type-icon class (related to dark mode toggle)
  if (headerContent.includes('type-icon')) {
    throw new Error('Header still contains type-icon class');
  }
});

// Test 4: Layout Validation
test('Main layout applies dark mode class permanently', () => {
  const layoutPath = join(projectRoot, 'src/layouts/DefaultLayout.astro');
  if (!existsSync(layoutPath)) {
    throw new Error('Default layout not found');
  }
  
  const layoutContent = readFileSync(layoutPath, 'utf-8');
  
  // Should have darkmode class on html element
  if (!layoutContent.includes('class="darkmode"')) {
    throw new Error('HTML element does not have darkmode class');
  }
});

// Test 5: Button and KBD Styles Validation
test('Button and KBD styles are configured for dark mode only', () => {
  const buttonPath = join(projectRoot, 'src/assets/scss/base/_button.scss');
  const kbdPath = join(projectRoot, 'src/assets/scss/base/_kbd.scss');
  
  // Check if button file exists and doesn't contain light-dark functions
  if (existsSync(buttonPath)) {
    const buttonContent = readFileSync(buttonPath, 'utf-8');
    if (buttonContent.includes('light-dark(')) {
      throw new Error('Button styles still contain light-dark() functions');
    }
  }
  
  // Check if kbd file exists and doesn't contain light-dark functions
  if (existsSync(kbdPath)) {
    const kbdContent = readFileSync(kbdPath, 'utf-8');
    if (kbdContent.includes('light-dark(')) {
      throw new Error('KBD styles still contain light-dark() functions');
    }
  }
  
  // Check root CSS for kbd variables
  const rootCssPath = join(projectRoot, 'src/assets/scss/base/_root.scss');
  const rootContent = readFileSync(rootCssPath, 'utf-8');
  
  const kbdVariables = [
    '--kbd-color-text: var(--color-neutral-800)',
    '--kbd-color-border: var(--color-neutral-300)',
    '--kbd-color-background: var(--color-neutral-200)'
  ];
  
  kbdVariables.forEach(variable => {
    if (!rootContent.includes(variable)) {
      throw new Error(`Missing KBD variable: ${variable}`);
    }
  });
});

// Test 6: Accessible Components Page Validation
test('Accessible components page is updated for dark mode only', () => {
  const accessiblePath = join(projectRoot, 'src/pages/accessible-components.astro');
  if (!existsSync(accessiblePath)) {
    console.log('   ⚠️  Accessible components page not found - skipping test');
    return;
  }
  
  const accessibleContent = readFileSync(accessiblePath, 'utf-8');
  
  // Should not contain references to dark mode toggle examples
  if (accessibleContent.includes('DarkMode') && accessibleContent.includes('toggle')) {
    throw new Error('Accessible components page still contains dark mode toggle examples');
  }
});

// Run all tests and display results
console.log('\n📊 Test Results:');
console.log(`✅ Passed: ${testsPassed}`);
console.log(`❌ Failed: ${testsFailed}`);
console.log(`📈 Total: ${testsPassed + testsFailed}`);

if (testsFailed > 0) {
  console.log('\n❌ Some tests failed. Please review the implementation.');
  process.exit(1);
} else {
  console.log('\n🎉 All tests passed! Dark mode only implementation is valid.');
  process.exit(0);
}