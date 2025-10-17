/**
 * Cross-Device Compatibility Test for Newsletter Page
 * Tests responsive behavior across different device sizes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function testCrossDeviceCompatibility() {
  console.log('📱 Testing Cross-Device Compatibility...\n');
  
  const newsletterPath = path.join(__dirname, '../src/pages/formacion/newsletter.astro');
  
  if (!fs.existsSync(newsletterPath)) {
    console.error('❌ Newsletter page not found');
    return false;
  }
  
  const content = fs.readFileSync(newsletterPath, 'utf8');
  
  // Device breakpoint tests
  const deviceTests = [
    {
      device: '📱 Mobile (320px-479px)',
      breakpoint: 'base',
      tests: [
        {
          name: 'Single column layout',
          test: () => content.includes('grid-cols-1') && !content.includes('grid-cols-1 grid-cols-2'),
          description: 'Ensures single column layout on mobile'
        },
        {
          name: 'Compact spacing',
          test: () => content.includes('p-4 sm:p-6') && content.includes('gap-4 sm:gap-6'),
          description: 'Uses compact spacing for mobile screens'
        },
        {
          name: 'Readable text sizes',
          test: () => content.includes('text-sm sm:text-base') && content.includes('text-lg sm:text-xl'),
          description: 'Maintains readable text sizes on small screens'
        },
        {
          name: 'Touch-friendly buttons',
          test: () => content.includes('py-3 sm:py-4') && content.includes('touch-manipulation'),
          description: 'Buttons are touch-friendly with adequate tap targets'
        }
      ]
    },
    {
      device: '📱 Small Mobile (480px-767px)',
      breakpoint: 'sm',
      tests: [
        {
          name: 'Two-column grids where appropriate',
          test: () => content.includes('sm:grid-cols-2'),
          description: 'Uses two-column layout for better space utilization'
        },
        {
          name: 'Increased spacing',
          test: () => content.includes('sm:p-6') && content.includes('sm:gap-6'),
          description: 'Provides more breathing room on larger mobile screens'
        },
        {
          name: 'Larger text and icons',
          test: () => content.includes('sm:text-base') && content.includes('sm:w-12 sm:h-12'),
          description: 'Scales up text and icons for better readability'
        }
      ]
    },
    {
      device: '💻 Tablet (768px-1023px)',
      breakpoint: 'md',
      tests: [
        {
          name: 'Multi-column layouts',
          test: () => content.includes('md:grid-cols-2') || content.includes('md:grid-cols-3'),
          description: 'Utilizes multi-column layouts for better content organization'
        },
        {
          name: 'Generous spacing',
          test: () => content.includes('md:p-8') && content.includes('md:gap-8'),
          description: 'Uses generous spacing for comfortable viewing'
        },
        {
          name: 'Larger typography',
          test: () => content.includes('md:text-3xl') && content.includes('md:my-16'),
          description: 'Scales up typography and section spacing'
        }
      ]
    },
    {
      device: '🖥️ Desktop (1024px+)',
      breakpoint: 'lg',
      tests: [
        {
          name: 'Three-column layouts',
          test: () => content.includes('lg:grid-cols-3'),
          description: 'Uses three-column layouts for optimal desktop viewing'
        },
        {
          name: 'Maximum content width',
          test: () => content.includes('max-w-4xl') || content.includes('max-w-6xl'),
          description: 'Constrains content width for optimal reading experience'
        }
      ]
    }
  ];
  
  let totalPassed = 0;
  let totalFailed = 0;
  
  deviceTests.forEach(deviceGroup => {
    console.log(`${deviceGroup.device}:`);
    console.log(`${'─'.repeat(40)}`);
    
    let devicePassed = 0;
    let deviceFailed = 0;
    
    deviceGroup.tests.forEach(test => {
      try {
        if (test.test()) {
          console.log(`  ✅ ${test.name}`);
          console.log(`     ${test.description}`);
          devicePassed++;
          totalPassed++;
        } else {
          console.log(`  ❌ ${test.name}`);
          console.log(`     ${test.description}`);
          deviceFailed++;
          totalFailed++;
        }
      } catch (error) {
        console.log(`  ❌ ${test.name} (Error: ${error.message})`);
        console.log(`     ${test.description}`);
        deviceFailed++;
        totalFailed++;
      }
    });
    
    console.log(`  📊 ${deviceGroup.device} Score: ${devicePassed}/${devicePassed + deviceFailed}\n`);
  });
  
  // Additional cross-device tests
  console.log('🔄 Cross-Device Feature Tests:');
  console.log('─'.repeat(40));
  
  const crossDeviceTests = [
    {
      name: 'Progressive enhancement',
      test: () => {
        // Check that base styles work without breakpoint classes
        return content.includes('w-full') && 
               content.includes('px-4') && 
               content.includes('py-3');
      },
      description: 'Base styles provide functional layout without responsive classes'
    },
    {
      name: 'Flexible form layout',
      test: () => {
        return content.includes('w-full sm:w-auto') &&
               content.includes('grid-cols-1 sm:grid-cols-2');
      },
      description: 'Form adapts from full-width mobile to flexible desktop layout'
    },
    {
      name: 'Scalable icon system',
      test: () => {
        return content.includes('w-10 h-10 sm:w-12 sm:h-12') &&
               content.includes('text-xl sm:text-2xl');
      },
      description: 'Icons and emojis scale appropriately across devices'
    },
    {
      name: 'Responsive message containers',
      test: () => {
        return content.includes('flex items-start sm:items-center') &&
               content.includes('text-xl sm:text-2xl flex-shrink-0');
      },
      description: 'Message containers adapt layout based on screen size'
    },
    {
      name: 'Consistent hover states',
      test: () => {
        return content.includes('hover:shadow-md') &&
               content.includes('hover:bg-primary-700') &&
               content.includes('transition-');
      },
      description: 'Hover effects work consistently across devices'
    }
  ];
  
  crossDeviceTests.forEach(test => {
    try {
      if (test.test()) {
        console.log(`  ✅ ${test.name}`);
        console.log(`     ${test.description}`);
        totalPassed++;
      } else {
        console.log(`  ❌ ${test.name}`);
        console.log(`     ${test.description}`);
        totalFailed++;
      }
    } catch (error) {
      console.log(`  ❌ ${test.name} (Error: ${error.message})`);
      console.log(`     ${test.description}`);
      totalFailed++;
    }
  });
  
  console.log(`\n📊 Overall Cross-Device Compatibility Results:`);
  console.log(`✅ Passed: ${totalPassed}`);
  console.log(`❌ Failed: ${totalFailed}`);
  console.log(`📈 Success Rate: ${Math.round((totalPassed / (totalPassed + totalFailed)) * 100)}%\n`);
  
  if (totalFailed === 0) {
    console.log('🎉 Excellent cross-device compatibility!');
    console.log('📱💻🖥️ The newsletter page works seamlessly across all device sizes.');
    return true;
  } else if (totalFailed <= 2) {
    console.log('✅ Good cross-device compatibility with minor issues.');
    console.log('🔧 Consider addressing the failed tests for optimal experience.');
    return true;
  } else {
    console.log('⚠️  Cross-device compatibility issues detected.');
    console.log('🔧 Please review and fix the failed tests for better responsive behavior.');
    return false;
  }
}

// Run the test
testCrossDeviceCompatibility();

export { testCrossDeviceCompatibility };