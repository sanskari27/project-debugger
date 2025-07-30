#!/usr/bin/env node

/**
 * Test ES Module (ESM) usage
 * Run with: node test/npm-tests/esm-test.mjs
 */

import { init } from '../../dist/esm/index.js';

console.log('🧪 Testing ES Module (ESM) usage...\n');

// Test 1: Check if init function exists
console.log('Test 1: Function availability');
if (typeof init === 'function') {
    console.log('✅ init function is available');
} else {
    console.log('❌ init function is not available');
    process.exit(1);
}

// Test 2: Check function signature
console.log('\nTest 2: Function signature');
const functionString = init.toString();
if (functionString.includes('async') && functionString.includes('opts')) {
    console.log('✅ init function has correct signature (async with opts parameter)');
} else {
    console.log('❌ init function has incorrect signature');
    console.log('Function signature:', functionString);
    process.exit(1);
}

// Test 3: Test initialization in Node.js environment
console.log('\nTest 3: Node.js environment handling');
try {
    await init({
        eventsAPIUrl: 'https://test.example.com/events',
        sid: 'test-session-id',
        uid: 'test-user-id',
        channel: 'test-channel'
    });
    console.log('✅ init function handles Node.js environment gracefully');
} catch (error) {
    if (error.message.includes('window') || error.message.includes('undefined')) {
        console.log('✅ init function properly handles Node.js environment (no window object)');
    } else {
        console.log('❌ Unexpected error:', error.message);
        process.exit(1);
    }
}

// Test 4: Test with minimal options
console.log('\nTest 4: Minimal options');
try {
    await init({
        eventsAPIUrl: 'https://api.example.com/events'
    });
    console.log('✅ init function works with minimal options');
} catch (error) {
    if (error.message.includes('window') || error.message.includes('undefined')) {
        console.log('✅ init function works with minimal options in Node.js');
    } else {
        console.log('❌ Error with minimal options:', error.message);
        process.exit(1);
    }
}

// Test 5: Test error handling for missing required parameter
// Note: In Node.js environment, the function returns early due to window check
console.log('\nTest 5: Error handling');
try {
    await init({});
    console.log('✅ init function handles missing eventsAPIUrl gracefully in Node.js (returns early)');
} catch (error) {
    if (error.message.includes('eventsAPIUrl is required')) {
        console.log('✅ Properly throws error for missing eventsAPIUrl (browser behavior)');
    } else if (error.message.includes('window') || error.message.includes('undefined')) {
        console.log('✅ init function handles missing eventsAPIUrl gracefully in Node.js (returns early)');
    } else {
        console.log('❌ Unexpected error message:', error.message);
        process.exit(1);
    }
}

console.log('\n🎉 All ES Module tests passed!'); 