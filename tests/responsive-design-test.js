/**
 * Responsive Design Test for Newsletter Page
 * Tests mobile-first responsive design implementation
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function testResponsiveDesign() {
  console.log('🧪 Testing Newsletter Page Responsive Design...\n');
  
  const newsletterPath = path.join(__dirname, '../src/pages/formacion/newsletter.astro');
  
  if (!fs.existsSync(newsletterPath)) {
    console.error('❌ Newsletter page not found');
    return false;
  }
  
  const content = fs.readFileSync(newsletterPath, 'utf8');
  
  const tests = [
    {
      name: 'Mobile-first grid layouts',
      test: () => content.includes('grid-cols-1 sm:grid-cols-2') && content.includes('grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'),
      description: 'Checks for proper mobile-first grid implementations'
    },
    {
      name: 'Responsive spacing',
      test: () => content.includes('p-4 sm:p-6 md:p-8') && content.includes('gap-4 sm:gap-6 md:gap-8'),
      description: 'Verifies responsive padding and gap spacing'
    },
    {
      name: 'Responsive typography',
      test: () => content.includes('text-lg sm:text-xl') && content.includes('text-sm sm:text-base'),
      description: 'Ensures text scales appropriately across devices'
    },
    {
      name: 'Touch-friendly interactions',
      test: () => content.includes('touch-manipulation') && content.includes('min-w-[200px]'),
      description: 'Validates touch-friendly button sizing and interactions'
    },
    {
      name: 'Responsive icon sizing',
      test: () => content.includes('w-10 h-10 sm:w-12 sm:h-12') && content.includes('text-xl sm:text-2xl'),
      description: 'Checks for responsive icon and emoji sizing'
    },
    {
      name: 'Flexible form layout',
      test: () => content.includes('grid-cols-1 sm:grid-cols-2') && content.includes('w-full sm:w-auto'),
      description: 'Verifies form adapts from single to multi-column layout'
    },
    {
      name: 'Responsive message containers',
      test: () => content.includes('flex items-start sm:items-center') && content.includes('mb-4 sm:mb-6'),
      description: 'Ensures message containers adapt to screen size'
    },
    {
      name: 'Consistent breakpoint usage',
      test: () => {
        const smBreakpoints = (content.match(/sm:/g) || []).length;
        const mdBreakpoints = (content.match(/md:/g) || []).length;
        return smBreakpoints > 10 && mdBreakpoints > 5; // Reasonable usage
      },
      description: 'Validates consistent use of responsive breakpoints'
    }
  ];
  
  let passed = 0;
  let failed = 0;
  
  tests.forEach(test => {
    try {
      if (test.test()) {
        console.log(`✅ ${test.name}`);
        console.log(`   ${test.description}\n`);
        passed++;
      } else {
        console.log(`❌ ${test.name}`);
        console.log(`   ${test.description}\n`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${test.name} (Error: ${error.message})`);
      console.log(`   ${test.description}\n`);
      failed++;
    }
  });
  
  // Additional checks for design consistency
  console.log('📋 Design Consistency Checks:\n');
  
  const consistencyChecks = [
    {
      name: 'Consistent card styling',
      check: () => {
        const cardPattern = /bg-white dark:bg-neutral-800.*?rounded-xl.*?shadow-sm.*?border border-neutral-200 dark:border-neutral-700/g;
        const matches = content.match(cardPattern);
        return matches && matches.length >= 3;
      }
    },
    {
      name: 'Proper dark mode support',
      check: () => {
        const darkModeClasses = (content.match(/dark:/g) || []).length;
        return darkModeClasses > 20; // Should have extensive dark mode support
      }
    },
    {
      name: 'Accessibility features',
      check: () => {
        return content.includes('aria-label') && 
               content.includes('role="alert"') && 
               content.includes('aria-live="polite"') &&
               content.includes('touch-manipulation');
      }
    }
  ];
  
  consistencyChecks.forEach(check => {
    if (check.check()) {
      console.log(`✅ ${check.name}`);
      passed++;
    } else {
      console.log(`❌ ${check.name}`);
      failed++;
    }
  });
  
  console.log(`\n📊 Test Results:`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%\n`);
  
  if (failed === 0) {
    console.log('🎉 All responsive design tests passed!');
    console.log('📱 The newsletter page is properly optimized for all device sizes.');
    return true;
  } else {
    console.log('⚠️  Some responsive design issues found.');
    console.log('🔧 Please review the failed tests and make necessary adjustments.');
    return false;
  }
}

// Run the test
testResponsiveDesign();

export { testResponsiveDesign };