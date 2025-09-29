#!/usr/bin/env node

/**
 * Manual Navigation Testing Script
 * 
 * This script provides a comprehensive manual testing checklist and starts a development server
 * for testing navigation functionality and responsive behavior.
 * 
 * Task 5 Requirements:
 * - Test all remaining navigation links function correctly
 * - Verify consultancy pages return 404 errors
 * - Confirm substack project page accessible via direct URL but hidden from menus
 * - Test responsive navigation behavior on mobile devices
 * 
 * Requirements: 1.1, 1.2, 2.1, 2.2, 2.4
 */

import { spawn } from 'child_process';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('🧪 Manual Navigation Testing Script\n');
console.log('This script will help you manually test the navigation requirements:\n');

// Display testing checklist
console.log('📋 MANUAL TESTING CHECKLIST');
console.log('=' .repeat(50));

console.log('\n🔍 1. HEADER NAVIGATION TESTING');
console.log('   □ Click "Inicio" - should navigate to home page');
console.log('   □ Hover "Formación" dropdown - should show Mentorías option');
console.log('   □ Click "Mentorías" - should navigate to /formacion/mentorias');
console.log('   □ Hover "Proyectos" dropdown - should show Apps and Open Source only');
console.log('   □ Verify NO consultancy link in Proyectos dropdown');
console.log('   □ Verify NO substack project link in Proyectos dropdown');
console.log('   □ Click "Apps" - should navigate to /proyectos/apps');
console.log('   □ Click "Open Source" - should navigate to /proyectos/open-source');
console.log('   □ Hover "Publicaciones" dropdown - should show Blog and Substack');
console.log('   □ Click "Blog" - should navigate to /blog/');
console.log('   □ Click "Substack" - should open codingpit.substack.com in new tab');
console.log('   □ Click "Contacto" - should navigate to /contacto');

console.log('\n🔍 2. FOOTER NAVIGATION TESTING');
console.log('   □ Check "Servicios" section - should NOT contain consultancy link');
console.log('   □ Click "Desarrollo de apps" - should navigate to /proyectos/apps');
console.log('   □ Click "Mentorías" - should navigate to /formacion/mentorias');
console.log('   □ Check "Contacto" section - should contain Substack external link');
console.log('   □ Click footer Substack link - should open codingpit.substack.com');

console.log('\n🔍 3. CONSULTANCY PAGES 404 TESTING');
console.log('   □ Navigate to /consultoria - should return 404 error');
console.log('   □ Navigate to /proyectos/consultoria - should return 404 error');
console.log('   □ Search for any consultancy references on pages - should find none');

console.log('\n🔍 4. SUBSTACK PROJECT PAGE TESTING');
console.log('   □ Navigate directly to /proyectos/substack - should load successfully');
console.log('   □ Verify page contains Substack post listings');
console.log('   □ Verify page is NOT linked from any navigation menus');
console.log('   □ Verify page is accessible but "hidden" from normal navigation');

console.log('\n🔍 5. RESPONSIVE NAVIGATION TESTING');
console.log('   □ Resize browser to mobile width (< 768px)');
console.log('   □ Verify navigation adapts to mobile layout');
console.log('   □ Test dropdown menus work on mobile');
console.log('   □ Verify all navigation links work on mobile');
console.log('   □ Test touch interactions on mobile devices');

console.log('\n🔍 6. ACCESSIBILITY TESTING');
console.log('   □ Tab through navigation using keyboard only');
console.log('   □ Verify dropdown menus open/close with Enter/Space');
console.log('   □ Check aria-expanded attributes change correctly');
console.log('   □ Test with screen reader if available');

console.log('\n📱 MOBILE TESTING URLS');
console.log('Test these URLs on mobile devices:');
console.log('   • http://localhost:4321/ (home)');
console.log('   • http://localhost:4321/formacion/mentorias');
console.log('   • http://localhost:4321/proyectos/apps');
console.log('   • http://localhost:4321/proyectos/open-source');
console.log('   • http://localhost:4321/blog/');
console.log('   • http://localhost:4321/contacto');

console.log('\n❌ ERROR TESTING URLS');
console.log('These should return 404 errors:');
console.log('   • http://localhost:4321/consultoria');
console.log('   • http://localhost:4321/proyectos/consultoria');

console.log('\n🔗 HIDDEN PAGE TESTING URL');
console.log('This should work but not be linked from navigation:');
console.log('   • http://localhost:4321/proyectos/substack');

console.log('\n' + '=' .repeat(50));

// Function to start development server
function startDevServer() {
  console.log('\n🚀 Starting development server...\n');
  
  const devServer = spawn('npm', ['run', 'dev'], {
    cwd: projectRoot,
    stdio: 'inherit'
  });

  devServer.on('error', (error) => {
    console.log('\n❌ Error starting development server:', error.message);
    console.log('\nPlease ensure you have run "npm install" and have the necessary dependencies.');
    process.exit(1);
  });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n\n🛑 Shutting down development server...');
    devServer.kill('SIGINT');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('\n\n🛑 Shutting down development server...');
    devServer.kill('SIGTERM');
    process.exit(0);
  });
}

// Function to display package.json scripts
function displayAvailableScripts() {
  try {
    const packageJsonPath = join(projectRoot, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    
    if (packageJson.scripts) {
      console.log('\n📦 Available npm scripts:');
      Object.entries(packageJson.scripts).forEach(([name, script]) => {
        if (name.includes('dev') || name.includes('start') || name.includes('build')) {
          console.log(`   • npm run ${name}: ${script}`);
        }
      });
    }
  } catch (error) {
    console.log('\n⚠️  Could not read package.json scripts');
  }
}

// Main execution
console.log('\n🎯 TESTING INSTRUCTIONS');
console.log('=' .repeat(50));
console.log('1. This script will start the development server');
console.log('2. Open your browser to http://localhost:4321');
console.log('3. Go through the manual testing checklist above');
console.log('4. Test on different screen sizes and devices');
console.log('5. Press Ctrl+C to stop the server when done');

displayAvailableScripts();

console.log('\n⏳ Press Enter to start the development server, or Ctrl+C to exit...');

// Wait for user input
process.stdin.once('data', () => {
  startDevServer();
});

// Handle immediate Ctrl+C
process.on('SIGINT', () => {
  console.log('\n\n👋 Manual testing cancelled.');
  process.exit(0);
});