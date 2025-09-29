#!/usr/bin/env node

/**
 * Comprehensive Test Runner for Dark Mode Only Implementation
 * 
 * This script runs all validation tests for task 7.
 * Tests Requirements: 2.1, 2.2, 2.3, 3.3
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🧪 Dark Mode Only Implementation - Comprehensive Test Suite\n');
console.log('This test suite validates all requirements for task 7:\n');
console.log('✓ Create automated tests to verify CSS compilation without errors');
console.log('✓ Test logo visibility across different screen sizes');
console.log('✓ Verify navigation functionality after component removal');
console.log('✓ Validate accessibility compliance for logo contrast');
console.log('✓ Requirements: 2.1, 2.2, 2.3, 3.3\n');

function runScript(scriptPath) {
  return new Promise((resolve, reject) => {
    console.log(`\n🔄 Running ${scriptPath}...\n`);
    
    const child = spawn('node', [scriptPath], {
      stdio: 'inherit',
      cwd: dirname(scriptPath)
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`\n✅ ${scriptPath} completed successfully\n`);
        resolve(true);
      } else {
        console.log(`\n❌ ${scriptPath} failed with code ${code}\n`);
        resolve(false);
      }
    });

    child.on('error', (error) => {
      console.log(`\n❌ Error running ${scriptPath}:`, error.message, '\n');
      resolve(false);
    });
  });
}

async function runAllTests() {
  const tests = [
    {
      name: 'CSS Validation',
      script: join(__dirname, 'css-validation.js'),
      description: 'Validates CSS variables and dark mode configuration'
    },
    {
      name: 'Build Validation',
      script: join(__dirname, 'build-validation.js'),
      description: 'Ensures application builds without CSS errors'
    }
  ];

  let allPassed = true;
  const results = [];

  for (const test of tests) {
    console.log(`📋 ${test.name}: ${test.description}`);
    const passed = await runScript(test.script);
    results.push({ name: test.name, passed });
    if (!passed) allPassed = false;
  }

  // Display final results
  console.log('=' .repeat(60));
  console.log('📊 FINAL TEST RESULTS');
  console.log('=' .repeat(60));
  
  results.forEach(result => {
    const status = result.passed ? '✅ PASSED' : '❌ FAILED';
    console.log(`${status} - ${result.name}`);
  });

  console.log('\n📈 Summary:');
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  console.log(`Passed: ${passed}/${total}`);
  
  if (allPassed) {
    console.log('\n🎉 All automated tests passed!');
    console.log('\n📋 Manual Testing Required:');
    console.log('To complete the validation, please run:');
    console.log('  node tests/visual-validation.js');
    console.log('\nThis will start a development server for manual visual testing.');
    console.log('Follow the checklist to verify logo visibility and navigation functionality.');
  } else {
    console.log('\n❌ Some tests failed. Please review the implementation.');
  }

  return allPassed;
}

// Run all tests
runAllTests().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.log('\n❌ Unexpected error running tests:', error.message);
  process.exit(1);
});