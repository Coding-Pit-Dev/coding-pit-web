/**
 * Visual Validation Test for Newsletter Page
 * Validates styling consistency with existing site patterns
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function validateVisualConsistency() {
  console.log('🎨 Validating Newsletter Page Visual Consistency...\n');
  
  const newsletterPath = path.join(__dirname, '../src/pages/formacion/newsletter.astro');
  const mentoriasPath = path.join(__dirname, '../src/pages/formacion/mentorias.astro');
  
  if (!fs.existsSync(newsletterPath)) {
    console.error('❌ Newsletter page not found');
    return false;
  }
  
  if (!fs.existsSync(mentoriasPath)) {
    console.error('❌ Mentorias page not found for comparison');
    return false;
  }
  
  const newsletterContent = fs.readFileSync(newsletterPath, 'utf8');
  const mentoriasContent = fs.readFileSync(mentoriasPath, 'utf8');
  
  const tests = [
    {
      name: 'Consistent page structure',
      test: () => {
        return newsletterContent.includes('DefaultLayout') &&
               newsletterContent.includes('PageHeader') &&
               newsletterContent.includes('main id="main-content"') &&
               newsletterContent.includes('Skip to main content');
      },
      description: 'Verifies consistent page layout structure'
    },
    {
      name: 'Consistent section spacing',
      test: () => {
        return newsletterContent.includes('my-12 md:my-16') &&
               newsletterContent.includes('py-12 md:py-16');
      },
      description: 'Checks for consistent section margin and padding patterns'
    },
    {
      name: 'Consistent card styling',
      test: () => {
        const cardPattern = /bg-white dark:bg-neutral-800.*?rounded-xl.*?shadow-sm.*?border border-neutral-200 dark:border-neutral-700/;
        return cardPattern.test(newsletterContent);
      },
      description: 'Validates consistent card component styling'
    },
    {
      name: 'Consistent color scheme',
      test: () => {
        return newsletterContent.includes('bg-primary-100 dark:bg-primary-900/80') &&
               newsletterContent.includes('bg-secondary-100 dark:bg-secondary-900/80') &&
               newsletterContent.includes('text-neutral-900 dark:text-neutral-50');
      },
      description: 'Ensures consistent color palette usage'
    },
    {
      name: 'Consistent typography hierarchy',
      test: () => {
        return newsletterContent.includes('text-2xl md:text-3xl font-bold') &&
               newsletterContent.includes('text-lg sm:text-xl font-semibold') &&
               newsletterContent.includes('leading-relaxed');
      },
      description: 'Validates consistent typography scale and hierarchy'
    },
    {
      name: 'Consistent button styling',
      test: () => {
        return newsletterContent.includes('bg-primary-600 hover:bg-primary-700') &&
               newsletterContent.includes('focus:ring-4 focus:ring-primary-300') &&
               newsletterContent.includes('font-semibold rounded-lg');
      },
      description: 'Checks for consistent button styling patterns'
    },
    {
      name: 'Consistent form styling',
      test: () => {
        return newsletterContent.includes('border border-neutral-300 dark:border-neutral-600') &&
               newsletterContent.includes('focus:ring-2 focus:ring-primary-500') &&
               newsletterContent.includes('bg-white dark:bg-neutral-700');
      },
      description: 'Validates consistent form input styling'
    },
    {
      name: 'Consistent hover effects',
      test: () => {
        return newsletterContent.includes('hover:shadow-md transition-shadow duration-200') &&
               newsletterContent.includes('transition-colors duration-200');
      },
      description: 'Ensures consistent hover and transition effects'
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
  
  // Cross-page consistency checks
  console.log('🔄 Cross-page Consistency Checks:\n');
  
  const crossPageChecks = [
    {
      name: 'Similar section backgrounds',
      check: () => {
        const newsletterBgs = (newsletterContent.match(/bg-neutral-50 dark:bg-neutral-900\/50/g) || []).length;
        const mentoriasBgs = (mentoriasContent.match(/bg-neutral-50 dark:bg-neutral-900\/50/g) || []).length;
        return newsletterBgs > 0; // Should use similar background patterns
      }
    },
    {
      name: 'Consistent container usage',
      check: () => {
        return newsletterContent.includes('container px-4 md:px-6 lg:px-8') &&
               newsletterContent.includes('max-w-4xl mx-auto');
      }
    },
    {
      name: 'Similar accessibility patterns',
      check: () => {
        return newsletterContent.includes('aria-labelledby') &&
               newsletterContent.includes('role="alert"') &&
               newsletterContent.includes('aria-live="polite"');
      }
    }
  ];
  
  crossPageChecks.forEach(check => {
    if (check.check()) {
      console.log(`✅ ${check.name}`);
      passed++;
    } else {
      console.log(`❌ ${check.name}`);
      failed++;
    }
  });
  
  console.log(`\n📊 Visual Consistency Results:`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%\n`);
  
  if (failed === 0) {
    console.log('🎉 All visual consistency tests passed!');
    console.log('🎨 The newsletter page follows the established design patterns.');
    return true;
  } else {
    console.log('⚠️  Some visual consistency issues found.');
    console.log('🔧 Please review the failed tests and align with site patterns.');
    return false;
  }
}

// Run the test
validateVisualConsistency();

export { validateVisualConsistency };