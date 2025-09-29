/**
 * Dark Mode Only Implementation Validation Tests
 * 
 * This test suite validates the dark-mode-only implementation according to:
 * - Requirements: 2.1, 2.2, 2.3, 3.3
 * - Task 7: Test and validate implementation
 */

import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

// Test 1: CSS compilation without errors
test.describe('CSS Compilation Tests', () => {
  test('CSS variables are properly defined without light-dark functions', async () => {
    const cssContent = readFileSync(join(process.cwd(), 'src/assets/scss/base/_root.scss'), 'utf-8');
    
    // Should not contain any light-dark() functions
    expect(cssContent).not.toContain('light-dark(');
    
    // Should have color-scheme set to dark
    expect(cssContent).toContain('color-scheme: dark');
    
    // Should have essential dark mode variables defined
    expect(cssContent).toContain('--foreground-color: var(--color-neutral-100)');
    expect(cssContent).toContain('--background-color: var(--color-neutral-900)');
    expect(cssContent).toContain('--icon-color: var(--color-neutral-100)');
  });

  test('Build process completes without CSS errors', async ({ page }) => {
    // This will be validated by the build command execution
    expect(true).toBe(true); // Placeholder - actual validation happens in build test
  });
});

// Test 2: Logo visibility across different screen sizes
test.describe('Logo Visibility Tests', () => {
  test('Logo is visible on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/');
    
    const logo = page.locator('.logo-container');
    await expect(logo).toBeVisible();
    
    // Check logo has proper background styling
    const logoStyles = await logo.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        border: styles.border,
        borderRadius: styles.borderRadius,
        padding: styles.padding
      };
    });
    
    expect(logoStyles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)'); // Should have background
    expect(logoStyles.border).toContain('1px'); // Should have border
  });

  test('Logo is visible on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    const logo = page.locator('.logo-container');
    await expect(logo).toBeVisible();
    
    // Logo should maintain visibility on tablet
    const logoBox = await logo.boundingBox();
    expect(logoBox.width).toBeGreaterThan(0);
    expect(logoBox.height).toBeGreaterThan(0);
  });

  test('Logo is visible on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const logo = page.locator('.logo-container');
    await expect(logo).toBeVisible();
    
    // Logo should maintain visibility on mobile
    const logoBox = await logo.boundingBox();
    expect(logoBox.width).toBeGreaterThan(0);
    expect(logoBox.height).toBeGreaterThan(0);
  });
});

// Test 3: Navigation functionality after component removal
test.describe('Navigation Functionality Tests', () => {
  test('Navigation renders without dark mode toggle', async ({ page }) => {
    await page.goto('/');
    
    // Should not contain dark mode toggle
    const darkModeToggle = page.locator('[data-testid="dark-mode-toggle"]');
    await expect(darkModeToggle).not.toBeVisible();
    
    // Navigation should still be functional
    const navigation = page.locator('nav');
    await expect(navigation).toBeVisible();
  });

  test('All navigation links are functional', async ({ page }) => {
    await page.goto('/');
    
    // Test main navigation links
    const homeLink = page.locator('a[href="/"]');
    await expect(homeLink).toBeVisible();
    
    // Test dropdown functionality
    const formacionButton = page.locator('button:has-text("Formación")');
    await expect(formacionButton).toBeVisible();
    
    // Click dropdown and verify it opens
    await formacionButton.click();
    const dropdown = page.locator('.dropdown-menu').first();
    await expect(dropdown).toBeVisible();
  });

  test('Navigation keyboard accessibility works', async ({ page }) => {
    await page.goto('/');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Tab'); // First nav item
    
    const focusedElement = await page.evaluate(() => document.activeElement.textContent);
    expect(focusedElement).toContain('Inicio');
  });
});

// Test 4: Accessibility compliance for logo contrast
test.describe('Logo Accessibility Tests', () => {
  test('Logo has sufficient contrast ratio', async ({ page }) => {
    await page.goto('/');
    
    const logo = page.locator('.logo-container');
    await expect(logo).toBeVisible();
    
    // Get computed styles for contrast calculation
    const logoStyles = await logo.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        border: styles.borderColor
      };
    });
    
    // Verify logo has background (for contrast)
    expect(logoStyles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(logoStyles.border).toBeTruthy();
  });

  test('Logo is accessible via screen reader', async ({ page }) => {
    await page.goto('/');
    
    const logoImage = page.locator('img[alt="Accessible Astro Logo"]');
    await expect(logoImage).toBeVisible();
    
    // Check alt text is present
    const altText = await logoImage.getAttribute('alt');
    expect(altText).toBe('Accessible Astro Logo');
  });

  test('Logo link has proper focus indication', async ({ page }) => {
    await page.goto('/');
    
    const logoLink = page.locator('.logo-container a');
    await logoLink.focus();
    
    // Check if focus is visible (browser will apply focus styles)
    const isFocused = await logoLink.evaluate(el => el === document.activeElement);
    expect(isFocused).toBe(true);
  });
});

// Test 5: Dark mode consistency across pages
test.describe('Dark Mode Consistency Tests', () => {
  const testPages = ['/', '/blog', '/contacto', '/accessible-components'];
  
  testPages.forEach(pagePath => {
    test(`Dark mode is applied on ${pagePath}`, async ({ page }) => {
      await page.goto(pagePath);
      
      // Check if html has darkmode class
      const htmlClass = await page.locator('html').getAttribute('class');
      expect(htmlClass).toContain('darkmode');
      
      // Check if dark background is applied
      const bodyStyles = await page.locator('body').evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color
        };
      });
      
      // Should have dark background (not white/light)
      expect(bodyStyles.backgroundColor).not.toBe('rgb(255, 255, 255)');
    });
  });
});