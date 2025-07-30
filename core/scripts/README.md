# Scripts

This directory contains utility scripts for the project.

## Publish Script

### `publish.sh`

A comprehensive publish script that runs all necessary checks before publishing the package to npm.

#### Features

- **Pre-publish Checks**:
  - Git status verification
  - Dependency installation
  - Linting checks
  - Type checking
  - Unit tests
  - NPM module tests
  - Build verification
  - NPM authentication check

- **Package Management**:
  - Version management (optional version bump)
  - Package name switching (publishes as `debugger-core`)
  - Automatic package name restoration
  - Git tagging

- **Safety Features**:
  - Colored output for better visibility
  - Interactive prompts for critical decisions
  - Comprehensive error handling
  - Rollback capabilities

#### Usage

```bash
# Publish with current version
npm run publish:npm

# Publish with specific version
npm run publish:npm 1.2.3

# Run script directly
./scripts/publish.sh [version]
```

#### Prerequisites

1. **NPM Account**: Must be logged in to npm (`npm login`)
2. **Git**: Must have git installed and configured
3. **Clean Working Directory**: Should have committed or stashed changes
4. **Dependencies**: All dependencies should be available

#### What the Script Does

1. **Environment Checks**:
   - Verifies npm and git are installed
   - Checks if working directory is clean
   - Validates npm authentication

2. **Quality Checks**:
   - Installs dependencies (`npm ci`)
   - Runs linting (`npm run lint`)
   - Runs type checking (`npm run type-check`)
   - Runs unit tests (`npm test`)
   - Runs npm module tests (`npm run test:npm`)

3. **Build Process**:
   - Builds the project (`npm run build`)
   - Verifies all build outputs exist

4. **Publishing**:
   - Updates version if specified
   - Temporarily changes package name to `debugger-core`
   - Publishes to npm
   - Restores original package name
   - Creates git tag

5. **Post-publish**:
   - Commits version changes
   - Creates git tag
   - Provides success information

#### Output Files

The script generates:

- Updated `package.json` (temporarily)
- Git commit with version changes
- Git tag for the published version

#### Error Handling

The script will stop and show an error if:

- Any pre-publish check fails
- NPM authentication fails
- Build process fails
- Publishing fails

#### Interactive Prompts

The script will ask for confirmation when:

- Working directory is not clean
- Package name already exists on npm
- Version conflicts occur

#### Example Output

```
🔧 STEP: Starting pre-publish checks...
🔧 STEP: Checking git status...
✅ SUCCESS: Working directory is clean
🔧 STEP: Installing dependencies...
✅ SUCCESS: Dependencies installed successfully
🔧 STEP: Running linting checks...
✅ SUCCESS: Linting passed
🔧 STEP: Running type checking...
✅ SUCCESS: Type checking passed
🔧 STEP: Running tests...
✅ SUCCESS: Tests passed
🔧 STEP: Running npm module tests...
✅ SUCCESS: NPM module tests passed
🔧 STEP: Building the project...
✅ SUCCESS: Build completed successfully
🔧 STEP: Verifying build outputs...
✅ SUCCESS: All build outputs exist
🔧 STEP: Checking npm authentication...
✅ SUCCESS: Logged in to npm as username
🔧 STEP: Checking package availability...
✅ SUCCESS: Package name 'debugger-core' is available
🔧 STEP: Updating package name to 'debugger-core'...
✅ SUCCESS: Package name updated to 'debugger-core'
🔧 STEP: Publishing to npm...
✅ SUCCESS: Package published successfully to npm!
🔧 STEP: Restoring original package name...
✅ SUCCESS: Package name restored
🔧 STEP: Creating git tag...
✅ SUCCESS: Git tag v1.0.0 created

✅ SUCCESS: 🎉 Package published successfully!
ℹ️  INFO: Package: debugger-core@1.0.0
ℹ️  INFO: NPM URL: https://www.npmjs.com/package/debugger-core
ℹ️  INFO: Install with: npm install debugger-core
```

#### Troubleshooting

**Common Issues**:

1. **"Not logged in to npm"**
   - Run `npm login` before publishing

2. **"Working directory is not clean"**
   - Commit or stash your changes
   - Or confirm to continue anyway

3. **"Package already exists"**
   - Choose a different version
   - Or confirm to overwrite

4. **"Build failed"**
   - Check for TypeScript errors
   - Verify all dependencies are installed

5. **"Tests failed"**
   - Fix failing tests before publishing
   - Check test output for details
