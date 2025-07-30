# debugger-core

A TypeScript library for tracking and debugging web applications. Supports both npm package and CDN usage.

## Installation

### As an npm package

```bash
npm install debugger-core
```

### Via CDN

```html
<script src="https://unpkg.com/debugger-core/dist/core.min.js"></script>
```

## Usage

### NPM Package Usage

```javascript
// ES6 modules
import { init } from 'debugger-core';

// CommonJS
const { init } = require('debugger-core');

// Initialize the debugger
init({
  eventsAPIUrl: 'https://your-api-endpoint.com/events',
  sid: 'session-id', // optional
  uid: 'user-id', // optional
  channel: 'web', // optional, defaults to 'core'
});
```

### CDN Usage

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Project Debugger Example</title>
  </head>
  <body>
    <h1>Hello World</h1>

    <script src="https://unpkg.com/debugger-core/dist/core.min.js"></script>
    <script>
      // The library is available as ProjectDebuggerCore
      ProjectDebuggerCore.init({
        eventsAPIUrl: 'https://your-api-endpoint.com/events',
        sid: 'session-id', // optional
        uid: 'user-id', // optional
        channel: 'web', // optional, defaults to 'core'
      });
    </script>
  </body>
</html>
```

## API Reference

### `init(options)`

Initializes the project debugger with the specified configuration.

#### Parameters

- `options` (Object)
  - `eventsAPIUrl` (string, required): The URL endpoint where events will be sent
  - `sid` (string, optional): Session ID for tracking
  - `uid` (string, optional): User ID for tracking
  - `channel` (string, optional): Channel identifier, defaults to 'core'

#### Example

```javascript
import { init } from 'debugger-core';

init({
  eventsAPIUrl: 'https://api.example.com/events',
  sid: 'session-123',
  uid: 'user-456',
  channel: 'production',
});
```

## Features

- **API Call Tracking**: Automatically tracks and logs API calls
- **Console Log Recording**: Captures console.log, console.error, etc.
- **DOM Updates**: Records DOM changes and updates
- **Session Management**: Built-in session tracking
- **Flexible Deployment**: Works as both npm package and CDN script

## Development

### Building

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Build in watch mode
npm run build:watch

# Type checking
npm run type-check

# Linting
npm run lint

# Testing
npm test
```

### Build Outputs

The build process generates multiple outputs:

- `dist/esm/index.js` - ES modules for modern bundlers
- `dist/cjs/index.js` - CommonJS for Node.js
- `dist/types/index.d.ts` - TypeScript declarations
- `dist/core.min.js` - Minified UMD bundle for CDN

## License

MIT
