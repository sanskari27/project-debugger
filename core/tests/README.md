# Tests

This directory contains all tests for the project debugger core library.

## Test Structure

```
tests/
├── README.md                    # This file
├── index.test.ts               # Main library tests
├── EventsManager.test.ts       # EventsManager class tests
├── utils.test.ts              # Utility functions tests
└── npm-tests/                 # NPM module compatibility tests
    ├── README.md
    ├── run-all-tests.sh
    ├── esm-test.mjs
    ├── cjs-test.cjs
    └── umd-test.html
```

## Test Categories

### 1. **Unit Tests** (`*.test.ts`)

- **`index.test.ts`**: Tests for the main library functionality
  - Function availability and signature
  - Node.js environment handling
  - Error handling
  - Options validation

- **`EventsManager.test.ts`**: Tests for the EventsManager class
  - Singleton pattern
  - Event handling (API, Console, DOM)
  - Initialization with tracking variables

- **`utils.test.ts`**: Tests for utility functions
  - `generateRandomId()` function
  - `generateTrackingHeaders()` function
  - `getSessionId()` function

### 2. **NPM Module Tests** (`npm-tests/`)

- **ES Module Tests**: Tests ES module compatibility
- **CommonJS Tests**: Tests CommonJS compatibility
- **UMD/CDN Tests**: Tests browser/CDN compatibility

## Running Tests

### All Tests

```bash
npm test
```

### Specific Test Files

```bash
# Run only unit tests
npm test -- tests/index.test.ts

# Run only EventsManager tests
npm test -- tests/EventsManager.test.ts

# Run only utility tests
npm test -- tests/utils.test.ts
```

### NPM Module Tests

```bash
# Run all npm module tests
npm run test:npm

# Run individual npm tests
node test/npm-tests/esm-test.mjs
node test/npm-tests/cjs-test.cjs
```

## Test Configuration

The tests are configured in `jest.config.js` with the following settings:

- **Test Environment**: Node.js
- **Test Pattern**: `**/tests/**/*.ts` and `**/?(*.)+(spec|test).ts`
- **Coverage**: Excludes test files and node_modules
- **TypeScript**: Full TypeScript support with ESM

## Test Coverage

Current test coverage includes:

### ✅ Functionality Tests

- Main library initialization
- Event management
- Utility functions
- Error handling
- Environment compatibility

### ✅ Module System Tests

- ES Module compatibility
- CommonJS compatibility
- UMD/CDN compatibility

### ✅ Environment Tests

- Node.js environment
- Browser environment (simulated)
- Cross-environment error handling

## Writing New Tests

### Unit Test Template

```typescript
import { functionName } from '../src/path/to/module';

describe('Module Name', () => {
  test('should do something', () => {
    // Test implementation
    expect(result).toBe(expected);
  });
});
```

### NPM Module Test Template

```javascript
// For ES modules (.mjs)
import { functionName } from '../../dist/esm/index.js';

// For CommonJS (.cjs)
const { functionName } = require('../../dist/cjs/index.js');
```

## Best Practices

1. **Test Isolation**: Each test should be independent
2. **Mocking**: Use mocks for external dependencies
3. **Environment**: Test both Node.js and browser environments
4. **Coverage**: Aim for high test coverage
5. **Naming**: Use descriptive test names

## Troubleshooting

### Common Issues

1. **"document is not defined"**
   - Use mocks for DOM elements in Node.js tests
   - Example: `{ tagName: 'DIV' }` instead of `document.createElement('div')`

2. **"sessionStorage is not defined"**
   - Mock sessionStorage for Node.js environment
   - Use try/finally blocks to restore global objects

3. **Import/Export Issues**
   - Use relative paths for local imports
   - Use dist paths for built module tests

### Debug Mode

```bash
# Run tests with verbose output
npm test -- --verbose

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm run test:watch
```
