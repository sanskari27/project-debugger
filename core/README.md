# Core

A TypeScript library that compiles to a single minified file for CDN deployment.

## Features

- 🚀 **TypeScript** - Written in TypeScript with full type support
- 📦 **Single File Output** - Compiles to a single minified file for CDN deployment
- 🛠️ **Modern Build** - Uses Rollup for efficient bundling
- 🧪 **Testing** - Jest for unit testing
- 📏 **Linting** - ESLint with TypeScript support
- 💅 **Formatting** - Prettier for consistent code style
- 📚 **Type Definitions** - Full TypeScript declaration files

## Installation

```bash
npm install core
```

## Usage

### ES6 Modules

```javascript
import { Core, generateId, deepClone } from 'core';

const core = new Core();
console.log(core.getVersion()); // "1.0.0"
console.log(core.greet('World')); // "Hello, World! Welcome to Core library."

// Utility functions
const id = generateId();
const cloned = deepClone({ a: 1, b: { c: 2 } });
```

### CommonJS

```javascript
const { Core, generateId, deepClone } = require('core');

const core = new Core();
console.log(core.getVersion());
```

### Browser (CDN)

```html
<script src="https://unpkg.com/core@1.0.0/dist/core.min.js"></script>
<script>
  const core = new Core.Core();
  console.log(core.getVersion());
  
  // Utility functions are available globally
  const id = Core.generateId();
  const cloned = Core.deepClone({ a: 1 });
</script>
```

## API Reference

### Core Class

#### `new Core()`
Creates a new Core instance.

#### `core.getVersion(): string`
Returns the library version.

#### `core.greet(name: string): string`
Returns a greeting message.

### Utility Functions

#### `generateId(): string`
Generates a unique ID.

#### `deepClone<T>(obj: T): T`
Deep clones an object, array, or primitive value.

#### `debounce<T>(func: T, wait: number): (...args: Parameters<T>) => void`
Creates a debounced function that delays execution.

#### `throttle<T>(func: T, limit: number): (...args: Parameters<T>) => void`
Creates a throttled function that limits execution frequency.

#### `isEmpty(value: any): boolean`
Checks if a value is empty (null, undefined, empty string, empty array, empty object).

#### `formatBytes(bytes: number, decimals?: number): string`
Formats bytes to human-readable format.

## Development

### Prerequisites

- Node.js >= 16.0.0
- npm

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd core

# Install dependencies
npm install
```

### Available Scripts

```bash
# Build the library
npm run build

# Build in watch mode
npm run build:watch

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check code formatting
npm run format:check

# Type checking
npm run type-check

# Clean build artifacts
npm run clean
```

### Build Output

The build process generates a single minified file optimized for CDN deployment:

- `dist/core.min.js` - Single minified UMD format for CDN and Node.js
- `dist/index.d.ts` - TypeScript declaration file

### Project Structure

```
core/
├── src/
│   ├── index.ts          # Main entry point
│   ├── types.ts          # Type definitions
│   ├── utils.ts          # Utility functions
│   └── __tests__/        # Test files
├── dist/                 # Build output
├── package.json
├── tsconfig.json
├── rollup.config.js
├── jest.config.js
├── .eslintrc.js
├── .prettierrc
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 