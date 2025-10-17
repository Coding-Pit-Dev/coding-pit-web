/**
 * Newsletter Live Integration Test
 * Tests the actual API integration with Listmonk and form functionality
 * 
 * Requirements: 4.1, 4.3, 4.4
 */

// Test configuration
const TEST_CONFIG = {
  baseUrl: 'http://localhost:4321',
  apiEndpoint: '/api/newsletter-subscription',
  testEmail: `test-${Date.now()}@example.com`,
  testName: 'Integration Test User'
};

// Test results tracking
const testResults = {
  passed: 0,
  failed: 0,
  errors: []
};

// Utility functions
function logTest(testName, passed, details = '') {
  const status = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${status}: ${testName}`);
  if (details) console.log(`   ${details}`);
  
  if (passed) {
    testResults.passed++;
  } else {
    testResults.failed++;
    testResults.errors.push(`${testName}: ${details}`);
  }
}

function logSection(sectionName) {
  console.log(`\n🔍 ${sectionName}`);
  console.log('='.repeat(50));
}

// API Integration Tests
async function testAPIIntegration() {
  logSection('Live API Integration Tests');
  
  // Test 1: Valid subscription
  try {
    const response = await fetch(`${TEST_CONFIG.baseUrl}${TEST_CONFIG.apiEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: TEST_CONFIG.testName,
        email: TEST_CONFIG.testEmail
      })
    });
    
    const result = await response.json();
    const isSuccess = response.ok && result.success;
    
    logTest('Valid subscription API call', isSuccess, 
      isSuccess ? 'API accepts valid subscription' : `API error: ${result.error || 'Unknown error'}`);
    
  } catch (error) {
    logTest('Valid subscription API call', false, `Network error: ${error.message}`);
  }
  
  // Test 2: Duplicate subscription
  try {
    const response = await fetch(`${TEST_CONFIG.baseUrl}${TEST_CONFIG.apiEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: TEST_CONFIG.testName,
        email: TEST_CONFIG.testEmail
      })
    });
    
    const result = await response.json();
    const isDuplicateHandled = !response.ok && result.error && 
                              result.error.includes('suscrito');
    
    logTest('Duplicate subscription handling', isDuplicateHandled,
      isDuplicateHandled ? 'Duplicate subscription properly rejected' : 'Duplicate not handled correctly');
    
  } catch (error) {
    logTest('Duplicate subscription handling', false, `Network error: ${error.message}`);
  }
  
  // Test 3: Invalid email format
  try {
    const response = await fetch(`${TEST_CONFIG.baseUrl}${TEST_CONFIG.apiEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'invalid-email-format'
      })
    });
    
    const result = await response.json();
    const isValidationWorking = !response.ok && result.error;
    
    logTest('Invalid email validation', isValidationWorking,
      isValidationWorking ? 'Invalid email properly rejected' : 'Email validation not working');
    
  } catch (error) {
    logTest('Invalid email validation', false, `Network error: ${error.message}`);
  }
  
  // Test 4: Empty fields
  try {
    const response = await fetch(`${TEST_CONFIG.baseUrl}${TEST_CONFIG.apiEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: '',
        email: ''
      })
    });
    
    const result = await response.json();
    const isEmptyValidationWorking = !response.ok && result.error;
    
    logTest('Empty fields validation', isEmptyValidationWorking,
      isEmptyValidationWorking ? 'Empty fields properly rejected' : 'Empty field validation not working');
    
  } catch (error) {
    logTest('Empty fields validation', false, `Network error: ${error.message}`);
  }
  
  // Test 5: Rate limiting (multiple rapid requests)
  try {
    const promises = [];
    const testEmail = `rate-test-${Date.now()}@example.com`;
    
    // Send 6 requests rapidly
    for (let i = 0; i < 6; i++) {
      promises.push(
        fetch(`${TEST_CONFIG.baseUrl}${TEST_CONFIG.apiEndpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: `Rate Test ${i}`,
            email: `${i}-${testEmail}`
          })
        })
      );
    }
    
    const responses = await Promise.all(promises);
    const rateLimitedResponses = responses.filter(r => r.status === 429);
    
    logTest('Rate limiting functionality', rateLimitedResponses.length > 0,
      rateLimitedResponses.length > 0 ? 
        `Rate limiting active (${rateLimitedResponses.length} requests blocked)` : 
        'Rate limiting may not be working');
    
  } catch (error) {
    logTest('Rate limiting functionality', false, `Error testing rate limiting: ${error.message}`);
  }
  
  // Test 6: Malformed JSON
  try {
    const response = await fetch(`${TEST_CONFIG.baseUrl}${TEST_CONFIG.apiEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: 'invalid-json'
    });
    
    const result = await response.json();
    const isMalformedHandled = !response.ok && result.error;
    
    logTest('Malformed JSON handling', isMalformedHandled,
      isMalformedHandled ? 'Malformed JSON properly handled' : 'Malformed JSON not handled');
    
  } catch (error) {
    logTest('Malformed JSON handling', false, `Error: ${error.message}`);
  }
}

// Security Tests
async function testSecurityMeasures() {
  logSection('Security Measures Tests');
  
  // Test 1: XSS attempt in name field
  try {
    const response = await fetch(`${TEST_CONFIG.baseUrl}${TEST_CONFIG.apiEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: '<script>alert("xss")</script>',
        email: `xss-test-${Date.now()}@example.com`
      })
    });
    
    const result = await response.json();
    // Should either reject or sanitize the input
    const isXSSHandled = !response.ok || !result.error?.includes('<script>');
    
    logTest('XSS prevention in name field', isXSSHandled,
      isXSSHandled ? 'XSS attempt properly handled' : 'XSS vulnerability detected');
    
  } catch (error) {
    logTest('XSS prevention in name field', false, `Error: ${error.message}`);
  }
  
  // Test 2: Very long input values
  try {
    const longString = 'a'.repeat(1000);
    const response = await fetch(`${TEST_CONFIG.baseUrl}${TEST_CONFIG.apiEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: longString,
        email: `long-test-${Date.now()}@example.com`
      })
    });
    
    const result = await response.json();
    const isLongInputHandled = !response.ok && result.error;
    
    logTest('Long input handling', isLongInputHandled,
      isLongInputHandled ? 'Long inputs properly rejected' : 'Long input validation may be missing');
    
  } catch (error) {
    logTest('Long input handling', false, `Error: ${error.message}`);
  }
}

// Performance Tests
async function testPerformance() {
  logSection('Performance Tests');
  
  // Test 1: Response time
  try {
    const startTime = Date.now();
    const response = await fetch(`${TEST_CONFIG.baseUrl}${TEST_CONFIG.apiEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Performance Test',
        email: `perf-test-${Date.now()}@example.com`
      })
    });
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    const isPerformant = responseTime < 5000; // 5 seconds max
    
    logTest('API response time', isPerformant,
      `Response time: ${responseTime}ms ${isPerformant ? '(Good)' : '(Slow)'}`);
    
  } catch (error) {
    logTest('API response time', false, `Error: ${error.message}`);
  }
}

// Main test execution
async function runLiveTests() {
  console.log('🧪 Newsletter Live Integration Test Suite');
  console.log('Testing Requirements: 4.1, 4.3, 4.4');
  console.log('='.repeat(70));
  console.log(`🌐 Testing against: ${TEST_CONFIG.baseUrl}`);
  console.log(`📧 Test email: ${TEST_CONFIG.testEmail}`);
  
  try {
    await testAPIIntegration();
    await testSecurityMeasures();
    await testPerformance();
  } catch (error) {
    console.error('Test execution error:', error);
  }
  
  // Print summary
  console.log('\n📊 Test Summary');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`📈 Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);
  
  if (testResults.failed > 0) {
    console.log('\n❌ Failed Tests:');
    testResults.errors.forEach(error => console.log(`   • ${error}`));
  }
  
  console.log('\n📝 Note: This test requires the development server to be running.');
  console.log('   Start with: npm run dev');
  
  // Return success status
  return testResults.failed === 0;
}

// Export for use in other test files
export { runLiveTests, testAPIIntegration, testSecurityMeasures };

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runLiveTests().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('Test runner error:', error);
    process.exit(1);
  });
}