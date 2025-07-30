# NPM Module Tests

This directory contains comprehensive tests for all three module types supported by the project debugger core library.

## Test Files

### 1. ES Module Test (`esm-test.mjs`)

Tests the ES module version of the library.

- **File**: `esm-test.mjs`
- **Run with**: `node test/npm-tests/esm-test.mjs`
- **Tests**:
  - Function availability
  - Function signature validation
  - Node.js environment handling
  - Minimal options support
  - Error handling for missing required parameters

### 2. CommonJS Test (`cjs-test.cjs`)

Tests the CommonJS version of the library.

- **File**: `cjs-test.cjs`
- **Run with**: `node test/npm-tests/cjs-test.cjs`
- **Tests**:
  - Function availability
  - Function signature validation
  - Node.js environment handling
  - Minimal options support
  - Error handling for missing required parameters
  - Destructuring import compatibility
  - Module exports structure

### 3. UMD/CDN Test (`umd-test.html`)

Tests the UMD bundle for CDN usage in a browser environment.

- **File**: `umd-test.html`
- **Run with**: Open in a web browser
- **Tests**:
  - Global object availability (`ProjectDebuggerCore`)
  - Function availability and signature
  - Error handling
  - Valid initialization
  - Interactive manual tests

## Running All Tests

### Automated Test Runner

Use the shell script to run all Node.js tests:

```bash
./test/npm-tests/run-all-tests.sh
```

This script will:

1. Check if dist files exist (build if needed)
2. Run ES Module tests
3. Run CommonJS tests
4. Provide instructions for UMD/CDN testing

### Individual Tests

#### ES Module Test

```bash
node test/npm-tests/esm-test.mjs
```

#### CommonJS Test

```bash
node test/npm-tests/cjs-test.cjs
```

#### UMD/CDN Test

1. Open `test/npm-tests/umd-test.html` in a web browser
2. The page will automatically run tests on load
3. Use the manual test buttons for additional testing

## Test Coverage

### Functionality Tests

- ✅ Function availability and signature
- ✅ Node.js environment compatibility
- ✅ Browser environment compatibility
- ✅ Error handling for missing required parameters
- ✅ Minimal options support
- ✅ Full options support

### Module System Tests

- ✅ ES Module import/export
- ✅ CommonJS require/module.exports
- ✅ UMD global object exposure
- ✅ Destructuring imports
- ✅ Module structure validation

### Environment Tests

- ✅ Node.js compatibility
- ✅ Browser compatibility
- ✅ Cross-environment error handling

## Expected Behavior

### Node.js Environment

- Functions should be available and callable
- Should handle missing `window` object gracefully
- Should throw appropriate errors for missing required parameters

### Browser Environment

- Global object should be available (`ProjectDebuggerCore`)
- Functions should work normally with browser APIs
- Should properly initialize event tracking

## Troubleshooting

### Common Issues

1. **"window is not defined" errors**
   - Expected in Node.js environment
   - Tests should handle this gracefully

2. **Module not found errors**
   - Ensure `npm run build` has been run
   - Check that dist files exist

3. **UMD test not loading**
   - Ensure `dist/core.min.js` exists
   - Check browser console for errors
   - Verify the script path in the HTML file

### Debug Mode

Add `console.log` statements to any test file to debug specific issues. The UMD test includes a console output capture feature for debugging browser-based issues.
