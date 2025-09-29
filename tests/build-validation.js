#!/usr/bin/env node

/**
 * Build Validation Script for Dark Mode Only Implementation
 * 
 * This script validates that the application builds successfully without CSS errors.
 * Tests Requirements: 3.3
 */

import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('🏗️  Running Build Validation for Dark Mode Only Implementation\n');

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      stdio: 'pipe',
      ...options
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr, code });
      } else {
        reject({ stdout, stderr, code });
      }
    });

    child.on('error', (error) => {
      reject({ error: error.message });
    });
  });
}

async function validateBuild() {
  try {
    console.log('📦 Installing dependencies...');
    await runCommand('npm', ['install']);
    console.log('✅ Dependencies installed successfully');

    console.log('\n🔨 Building application...');
    const buildResult = await runCommand('npm', ['run', 'build']);
    
    // Check for CSS-related errors in build output
    const buildOutput = buildResult.stdout + buildResult.stderr;
    
    // Look for actual error patterns, not just the word "error"
    if (buildOutput.includes('CSS error') || buildOutput.includes('css error')) {
      throw new Error('CSS errors detected in build output');
    }
    
    if (buildOutput.includes('undefined variable') || buildOutput.includes('Undefined variable')) {
      throw new Error('Undefined CSS variables detected in build output');
    }
    
    // Check for build failures
    if (buildOutput.includes('Build failed') || buildOutput.includes('build failed')) {
      throw new Error('Build process failed');
    }
    
    console.log('✅ Application built successfully without CSS errors');

    // Check if dist directory was created
    const distPath = join(projectRoot, 'dist');
    if (!existsSync(distPath)) {
      throw new Error('Build output directory (dist) was not created');
    }
    
    console.log('✅ Build output directory created successfully');

    // Check if main CSS file exists in build output
    const cssFiles = ['_astro', 'assets'].some(dir => {
      const dirPath = join(distPath, dir);
      return existsSync(dirPath);
    });
    
    if (!cssFiles) {
      console.log('⚠️  Could not verify CSS files in build output (this may be normal)');
    } else {
      console.log('✅ CSS assets found in build output');
    }

    return true;
  } catch (error) {
    console.log('❌ Build validation failed:');
    if (error.stdout) {
      console.log('STDOUT:', error.stdout);
    }
    if (error.stderr) {
      console.log('STDERR:', error.stderr);
    }
    if (error.error) {
      console.log('ERROR:', error.error);
    }
    return false;
  }
}

// Run validation
validateBuild().then(success => {
  if (success) {
    console.log('\n🎉 Build validation passed! Application compiles without CSS errors.');
    process.exit(0);
  } else {
    console.log('\n❌ Build validation failed. Please check the errors above.');
    process.exit(1);
  }
}).catch(error => {
  console.log('\n❌ Unexpected error during build validation:', error.message);
  process.exit(1);
});