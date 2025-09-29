#!/usr/bin/env node

/**
 * Visual Validation Script for Dark Mode Only Implementation
 * 
 * This script validates logo visibility and navigation functionality.
 * Tests Requirements: 2.1, 2.2, 2.3
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('👁️  Running Visual Validation for Dark Mode Only Implementation\n');

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      stdio: 'inherit',
      ...options
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

async function validateVisuals() {
  try {
    console.log('🚀 Starting development server for visual validation...');
    
    // Start dev server in background
    const devServer = spawn('npm', ['run', 'dev'], {
      cwd: projectRoot,
      stdio: 'pipe'
    });

    // Wait for server to start
    await new Promise((resolve) => {
      devServer.stdout.on('data', (data) => {
        const output = data.toString();
        if (output.includes('Local:') || output.includes('localhost')) {
          console.log('✅ Development server started');
          resolve();
        }
      });
    });

    // Give server a moment to fully initialize
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('\n📋 Manual Visual Validation Checklist:');
    console.log('Please verify the following in your browser at http://localhost:4321:');
    console.log('');
    console.log('🔍 Logo Visibility Tests:');
    console.log('  □ Logo has a visible background container');
    console.log('  □ Logo text "Coding Pit" is clearly readable');
    console.log('  □ Logo maintains visibility on desktop (1200px+)');
    console.log('  □ Logo maintains visibility on tablet (768px)');
    console.log('  □ Logo maintains visibility on mobile (375px)');
    console.log('  □ Logo background has subtle border and padding');
    console.log('');
    console.log('🧭 Navigation Functionality Tests:');
    console.log('  □ No dark mode toggle button is visible');
    console.log('  □ All navigation links are clickable');
    console.log('  □ Dropdown menus work correctly');
    console.log('  □ Keyboard navigation works (Tab key)');
    console.log('  □ Focus indicators are visible');
    console.log('');
    console.log('🎨 Dark Mode Consistency Tests:');
    console.log('  □ All pages display in dark mode');
    console.log('  □ No light mode elements are visible');
    console.log('  □ Color scheme is consistent across pages');
    console.log('  □ Text contrast is adequate for readability');
    console.log('');
    console.log('♿ Accessibility Tests:');
    console.log('  □ Logo has sufficient contrast against background');
    console.log('  □ Logo image has proper alt text');
    console.log('  □ Focus indicators are clearly visible');
    console.log('  □ Screen reader can access logo link');
    console.log('');

    // Keep server running for manual testing
    console.log('🔄 Server is running for manual testing...');
    console.log('Press Ctrl+C to stop the server when testing is complete.');
    
    // Wait for user to stop the server
    await new Promise((resolve) => {
      process.on('SIGINT', () => {
        console.log('\n🛑 Stopping development server...');
        devServer.kill();
        resolve();
      });
    });

    return true;
  } catch (error) {
    console.log('❌ Visual validation setup failed:', error.message);
    return false;
  }
}

// Run validation
validateVisuals().then(success => {
  if (success) {
    console.log('\n✅ Visual validation setup completed.');
    console.log('Please ensure all checklist items were verified manually.');
  } else {
    console.log('\n❌ Visual validation setup failed.');
    process.exit(1);
  }
}).catch(error => {
  console.log('\n❌ Unexpected error during visual validation:', error.message);
  process.exit(1);
});