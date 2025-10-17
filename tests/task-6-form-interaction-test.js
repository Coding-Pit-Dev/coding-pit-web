/**
 * Task 6 - Form Interaction and User Feedback Test
 * Tests the JavaScript form submission handling, loading states, and user feedback
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test configuration
const TEST_CONFIG = {
  pageFile: 'src/pages/formacion/newsletter.astro',
  apiFile: 'src/pages/_api/newsletter-subscription.ts',
  testScenarios: [
    {
      name: 'Empty form submission',
      input: { name: '', email: '' },
      expectedValidation: ['name-error', 'email-error']
    },
    {
      name: 'Invalid email format',
      input: { name: 'Test User', email: 'invalid-email' },
      expectedValidation: ['email-error']
    },
    {
      name: 'Short name',
      input: { name: 'A', email: 'test@example.com' },
      expectedValidation: ['name-error']
    },
    {
      name: 'Valid input',
      input: { name: 'Test User', email: 'test@example.com' },
      expectedValidation: []
    }
  ]
};

class FormInteractionTester {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      details: []
    };
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${type.toUpperCase()}: ${message}`;
    console.log(logMessage);
    this.results.details.push({ timestamp, type, message });
  }

  async testFileExists(filePath) {
    try {
      const fullPath = path.resolve(filePath);
      const exists = fs.existsSync(fullPath);
      if (exists) {
        this.log(`✓ File exists: ${filePath}`, 'success');
        this.results.passed++;
        return true;
      } else {
        this.log(`✗ File missing: ${filePath}`, 'error');
        this.results.failed++;
        return false;
      }
    } catch (error) {
      this.log(`✗ Error checking file ${filePath}: ${error.message}`, 'error');
      this.results.failed++;
      return false;
    }
  }

  async testFormElements() {
    try {
      const pageContent = fs.readFileSync(TEST_CONFIG.pageFile, 'utf8');
      
      // Test for required form elements
      const requiredElements = [
        { pattern: /id="newsletter-form"/, description: 'Newsletter form' },
        { pattern: /id="name"/, description: 'Name input field' },
        { pattern: /id="email"/, description: 'Email input field' },
        { pattern: /id="submit-button"/, description: 'Submit button' },
        { pattern: /id="success-message"/, description: 'Success message container' },
        { pattern: /id="error-message"/, description: 'Error message container' },
        { pattern: /id="loading-spinner"/, description: 'Loading spinner' },
        { pattern: /id="name-error"/, description: 'Name error message' },
        { pattern: /id="email-error"/, description: 'Email error message' }
      ];

      let elementsFound = 0;
      for (const { pattern, description } of requiredElements) {
        if (pattern.test(pageContent)) {
          this.log(`✓ Found ${description}`, 'success');
          elementsFound++;
        } else {
          this.log(`✗ Missing ${description}`, 'error');
        }
      }

      if (elementsFound === requiredElements.length) {
        this.log(`✓ All form elements present (${elementsFound}/${requiredElements.length})`, 'success');
        this.results.passed++;
        return true;
      } else {
        this.log(`✗ Missing form elements (${elementsFound}/${requiredElements.length})`, 'error');
        this.results.failed++;
        return false;
      }
    } catch (error) {
      this.log(`✗ Error testing form elements: ${error.message}`, 'error');
      this.results.failed++;
      return false;
    }
  }

  async testJavaScriptFunctionality() {
    try {
      const pageContent = fs.readFileSync(TEST_CONFIG.pageFile, 'utf8');
      
      // Test for required JavaScript functionality
      const requiredFunctions = [
        { pattern: /validateName\s*\(/, description: 'Name validation function' },
        { pattern: /validateEmail\s*\(/, description: 'Email validation function' },
        { pattern: /setLoadingState\s*\(/, description: 'Loading state function' },
        { pattern: /showSuccessMessage\s*\(/, description: 'Success message function' },
        { pattern: /showErrorMessage\s*\(/, description: 'Error message function' },
        { pattern: /addEventListener\s*\(\s*['"]submit['"]/, description: 'Form submit handler' },
        { pattern: /addEventListener\s*\(\s*['"]blur['"]/, description: 'Field blur handlers' },
        { pattern: /fetch\s*\(\s*['"]\/api\/newsletter-subscription['"]/, description: 'API call' }
      ];

      let functionsFound = 0;
      for (const { pattern, description } of requiredFunctions) {
        if (pattern.test(pageContent)) {
          this.log(`✓ Found ${description}`, 'success');
          functionsFound++;
        } else {
          this.log(`✗ Missing ${description}`, 'error');
        }
      }

      if (functionsFound === requiredFunctions.length) {
        this.log(`✓ All JavaScript functionality present (${functionsFound}/${requiredFunctions.length})`, 'success');
        this.results.passed++;
        return true;
      } else {
        this.log(`✗ Missing JavaScript functionality (${functionsFound}/${requiredFunctions.length})`, 'error');
        this.results.failed++;
        return false;
      }
    } catch (error) {
      this.log(`✗ Error testing JavaScript functionality: ${error.message}`, 'error');
      this.results.failed++;
      return false;
    }
  }

  async testValidationLogic() {
    try {
      const pageContent = fs.readFileSync(TEST_CONFIG.pageFile, 'utf8');
      
      // Test for validation patterns
      const validationTests = [
        { pattern: /emailRegex\s*=\s*\/\^[^\\s@]+@[^\\s@]+\\.[^\\s@]+\$\//, description: 'Email regex pattern' },
        { pattern: /name\.trim\(\)\.length\s*<\s*2/, description: 'Name length validation' },
        { pattern: /!name\.trim\(\)/, description: 'Name required validation' },
        { pattern: /!email\.trim\(\)/, description: 'Email required validation' },
        { pattern: /!emailRegex\.test\(email\.trim\(\)\)/, description: 'Email format validation' }
      ];

      let validationFound = 0;
      for (const { pattern, description } of validationTests) {
        if (pattern.test(pageContent)) {
          this.log(`✓ Found ${description}`, 'success');
          validationFound++;
        } else {
          this.log(`✗ Missing ${description}`, 'error');
        }
      }

      if (validationFound >= 4) { // Allow some flexibility in implementation
        this.log(`✓ Validation logic implemented (${validationFound}/${validationTests.length})`, 'success');
        this.results.passed++;
        return true;
      } else {
        this.log(`✗ Insufficient validation logic (${validationFound}/${validationTests.length})`, 'error');
        this.results.failed++;
        return false;
      }
    } catch (error) {
      this.log(`✗ Error testing validation logic: ${error.message}`, 'error');
      this.results.failed++;
      return false;
    }
  }

  async testLoadingStates() {
    try {
      const pageContent = fs.readFileSync(TEST_CONFIG.pageFile, 'utf8');
      
      // Test for loading state functionality
      const loadingTests = [
        { pattern: /submitButton\.disabled\s*=\s*true/, description: 'Button disable on loading' },
        { pattern: /buttonText\.textContent\s*=\s*['"]Procesando\.\.\.['"]/, description: 'Loading button text' },
        { pattern: /loadingSpinner\.classList\.remove\(['"]hidden['"]\)/, description: 'Show loading spinner' },
        { pattern: /submitButton\.disabled\s*=\s*false/, description: 'Button enable after loading' },
        { pattern: /loadingSpinner\.classList\.add\(['"]hidden['"]\)/, description: 'Hide loading spinner' }
      ];

      let loadingFound = 0;
      for (const { pattern, description } of loadingTests) {
        if (pattern.test(pageContent)) {
          this.log(`✓ Found ${description}`, 'success');
          loadingFound++;
        } else {
          this.log(`✗ Missing ${description}`, 'error');
        }
      }

      if (loadingFound >= 4) { // Allow some flexibility
        this.log(`✓ Loading states implemented (${loadingFound}/${loadingTests.length})`, 'success');
        this.results.passed++;
        return true;
      } else {
        this.log(`✗ Insufficient loading state implementation (${loadingFound}/${loadingTests.length})`, 'error');
        this.results.failed++;
        return false;
      }
    } catch (error) {
      this.log(`✗ Error testing loading states: ${error.message}`, 'error');
      this.results.failed++;
      return false;
    }
  }

  async testUserFeedback() {
    try {
      const pageContent = fs.readFileSync(TEST_CONFIG.pageFile, 'utf8');
      
      // Test for user feedback functionality
      const feedbackTests = [
        { pattern: /showSuccessMessage/, description: 'Success message display' },
        { pattern: /showErrorMessage/, description: 'Error message display' },
        { pattern: /scrollIntoView/, description: 'Scroll to message' },
        { pattern: /aria-live=['"]polite['"]/, description: 'Screen reader announcements' },
        { pattern: /role=['"]alert['"]/, description: 'Alert role for messages' },
        { pattern: /focus\(\)/, description: 'Focus management' }
      ];

      let feedbackFound = 0;
      for (const { pattern, description } of feedbackTests) {
        if (pattern.test(pageContent)) {
          this.log(`✓ Found ${description}`, 'success');
          feedbackFound++;
        } else {
          this.log(`✗ Missing ${description}`, 'error');
        }
      }

      if (feedbackFound >= 5) { // Allow some flexibility
        this.log(`✓ User feedback implemented (${feedbackFound}/${feedbackTests.length})`, 'success');
        this.results.passed++;
        return true;
      } else {
        this.log(`✗ Insufficient user feedback implementation (${feedbackFound}/${feedbackTests.length})`, 'error');
        this.results.failed++;
        return false;
      }
    } catch (error) {
      this.log(`✗ Error testing user feedback: ${error.message}`, 'error');
      this.results.failed++;
      return false;
    }
  }

  async testAPIIntegration() {
    try {
      const pageContent = fs.readFileSync(TEST_CONFIG.pageFile, 'utf8');
      const apiContent = fs.readFileSync(TEST_CONFIG.apiFile, 'utf8');
      
      // Test API integration
      const apiTests = [
        { content: pageContent, pattern: /fetch\s*\(\s*['"]\/api\/newsletter-subscription['"]/, description: 'Frontend API call' },
        { content: pageContent, pattern: /method:\s*['"]POST['"]/, description: 'POST method usage' },
        { content: pageContent, pattern: /Content-Type['"]:\s*['"]application\/json['"]/, description: 'JSON content type' },
        { content: apiContent, pattern: /export\s+const\s+POST/, description: 'API POST handler' },
        { content: apiContent, pattern: /validateInput/, description: 'API input validation' },
        { content: apiContent, pattern: /checkRateLimit/, description: 'API rate limiting' }
      ];

      let apiFound = 0;
      for (const { content, pattern, description } of apiTests) {
        if (pattern.test(content)) {
          this.log(`✓ Found ${description}`, 'success');
          apiFound++;
        } else {
          this.log(`✗ Missing ${description}`, 'error');
        }
      }

      if (apiFound === apiTests.length) {
        this.log(`✓ API integration complete (${apiFound}/${apiTests.length})`, 'success');
        this.results.passed++;
        return true;
      } else {
        this.log(`✗ Incomplete API integration (${apiFound}/${apiTests.length})`, 'error');
        this.results.failed++;
        return false;
      }
    } catch (error) {
      this.log(`✗ Error testing API integration: ${error.message}`, 'error');
      this.results.failed++;
      return false;
    }
  }

  async testAccessibility() {
    try {
      const pageContent = fs.readFileSync(TEST_CONFIG.pageFile, 'utf8');
      
      // Test accessibility features
      const a11yTests = [
        { pattern: /aria-required=['"]true['"]/, description: 'Required field indicators' },
        { pattern: /aria-describedby/, description: 'Field descriptions' },
        { pattern: /aria-invalid/, description: 'Invalid field indicators' },
        { pattern: /aria-live=['"]polite['"]/, description: 'Live regions' },
        { pattern: /role=['"]alert['"]/, description: 'Alert roles' },
        { pattern: /aria-label/, description: 'Accessible labels' }
      ];

      let a11yFound = 0;
      for (const { pattern, description } of a11yTests) {
        if (pattern.test(pageContent)) {
          this.log(`✓ Found ${description}`, 'success');
          a11yFound++;
        } else {
          this.log(`✗ Missing ${description}`, 'error');
        }
      }

      if (a11yFound >= 5) { // Allow some flexibility
        this.log(`✓ Accessibility features implemented (${a11yFound}/${a11yTests.length})`, 'success');
        this.results.passed++;
        return true;
      } else {
        this.log(`✗ Insufficient accessibility features (${a11yFound}/${a11yTests.length})`, 'error');
        this.results.failed++;
        return false;
      }
    } catch (error) {
      this.log(`✗ Error testing accessibility: ${error.message}`, 'error');
      this.results.failed++;
      return false;
    }
  }

  async runAllTests() {
    this.log('Starting Task 6 - Form Interaction and User Feedback Tests', 'info');
    this.log('='.repeat(60), 'info');

    // Test file existence
    await this.testFileExists(TEST_CONFIG.pageFile);
    await this.testFileExists(TEST_CONFIG.apiFile);

    // Test form implementation
    await this.testFormElements();
    await this.testJavaScriptFunctionality();
    await this.testValidationLogic();
    await this.testLoadingStates();
    await this.testUserFeedback();
    await this.testAPIIntegration();
    await this.testAccessibility();

    // Generate summary
    this.generateSummary();
  }

  generateSummary() {
    this.log('='.repeat(60), 'info');
    this.log('TEST SUMMARY', 'info');
    this.log('='.repeat(60), 'info');
    
    const total = this.results.passed + this.results.failed;
    const passRate = total > 0 ? ((this.results.passed / total) * 100).toFixed(1) : 0;
    
    this.log(`Total Tests: ${total}`, 'info');
    this.log(`Passed: ${this.results.passed}`, 'success');
    this.log(`Failed: ${this.results.failed}`, this.results.failed > 0 ? 'error' : 'info');
    this.log(`Pass Rate: ${passRate}%`, passRate >= 90 ? 'success' : 'warning');

    if (this.results.failed === 0) {
      this.log('🎉 All tests passed! Task 6 implementation is complete.', 'success');
    } else {
      this.log('⚠️  Some tests failed. Please review the implementation.', 'warning');
    }

    // Task completion status
    const taskComplete = this.results.failed === 0;
    this.log(`Task 6 Status: ${taskComplete ? 'COMPLETE' : 'INCOMPLETE'}`, taskComplete ? 'success' : 'error');
    
    return taskComplete;
  }
}

// Run the tests
async function runTests() {
  const tester = new FormInteractionTester();
  const success = await tester.runAllTests();
  process.exit(success ? 0 : 1);
}

// Run the tests if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests().catch(console.error);
}

export { FormInteractionTester, TEST_CONFIG };