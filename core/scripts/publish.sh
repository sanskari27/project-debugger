#!/bin/bash

# Publish script for debugger-core
# Run with: ./scripts/publish.sh [version]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    case $status in
        "SUCCESS")
            echo -e "${GREEN}✅ SUCCESS${NC}: $message"
            ;;
        "FAIL")
            echo -e "${RED}❌ FAIL${NC}: $message"
            ;;
        "INFO")
            echo -e "${BLUE}ℹ️  INFO${NC}: $message"
            ;;
        "WARN")
            echo -e "${YELLOW}⚠️  WARN${NC}: $message"
            ;;
        "STEP")
            echo -e "${PURPLE}🔧 STEP${NC}: $message"
            ;;
    esac
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_status "FAIL" "Please run this script from the core directory"
    exit 1
fi

# Check if npm is installed
if ! command_exists npm; then
    print_status "FAIL" "npm is not installed"
    exit 1
fi

# Check if git is installed
if ! command_exists git; then
    print_status "FAIL" "git is not installed"
    exit 1
fi

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
print_status "INFO" "Current version: $CURRENT_VERSION"

# Check if version argument is provided
if [ -n "$1" ]; then
    NEW_VERSION=$1
    print_status "INFO" "New version will be: $NEW_VERSION"
else
    print_status "WARN" "No version specified. Using current version: $CURRENT_VERSION"
    NEW_VERSION=$CURRENT_VERSION
fi

echo ""
print_status "STEP" "Starting pre-publish checks..."

# Step 1: Check if working directory is clean
print_status "STEP" "Checking git status..."
if [ -n "$(git status --porcelain)" ]; then
    print_status "WARN" "Working directory is not clean. Please commit or stash changes."
    echo "Uncommitted changes:"
    git status --porcelain
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_status "INFO" "Publish cancelled"
        exit 1
    fi
else
    print_status "SUCCESS" "Working directory is clean"
fi

# Step 2: Install dependencies
print_status "STEP" "Installing dependencies..."
if npm ci; then
    print_status "SUCCESS" "Dependencies installed successfully"
else
    print_status "FAIL" "Failed to install dependencies"
    exit 1
fi

# Step 3: Run linting
print_status "STEP" "Running linting checks..."
if npm run lint; then
    print_status "SUCCESS" "Linting passed"
else
    print_status "FAIL" "Linting failed"
    exit 1
fi

# Step 4: Run type checking
print_status "STEP" "Running type checking..."
if npm run type-check; then
    print_status "SUCCESS" "Type checking passed"
else
    print_status "FAIL" "Type checking failed"
    exit 1
fi

# Step 5: Run tests
print_status "STEP" "Running tests..."
if npm test; then
    print_status "SUCCESS" "Tests passed"
else
    print_status "FAIL" "Tests failed"
    exit 1
fi

# Step 6: Run npm module tests
print_status "STEP" "Running npm module tests..."
if npm run test:npm; then
    print_status "SUCCESS" "NPM module tests passed"
else
    print_status "FAIL" "NPM module tests failed"
    exit 1
fi

# Step 7: Build the project
print_status "STEP" "Building the project..."
if npm run build; then
    print_status "SUCCESS" "Build completed successfully"
else
    print_status "FAIL" "Build failed"
    exit 1
fi

# Step 8: Check if dist files exist
print_status "STEP" "Verifying build outputs..."
if [ -f "dist/esm/index.js" ] && [ -f "dist/cjs/index.js" ] && [ -f "dist/core.min.js" ] && [ -f "dist/types/index.d.ts" ]; then
    print_status "SUCCESS" "All build outputs exist"
else
    print_status "FAIL" "Missing build outputs"
    echo "Expected files:"
    echo "  - dist/esm/index.js"
    echo "  - dist/cjs/index.js"
    echo "  - dist/core.min.js"
    echo "  - dist/types/index.d.ts"
    exit 1
fi

# Step 9: Update version if needed
if [ "$NEW_VERSION" != "$CURRENT_VERSION" ]; then
    print_status "STEP" "Updating version to $NEW_VERSION..."
    if npm version "$NEW_VERSION" --no-git-tag-version; then
        print_status "SUCCESS" "Version updated to $NEW_VERSION"
    else
        print_status "FAIL" "Failed to update version"
        exit 1
    fi
fi

# Step 10: Check if user is logged in to npm
print_status "STEP" "Checking npm authentication..."
if npm whoami; then
    print_status "SUCCESS" "Logged in to npm as $(npm whoami)"
else
    print_status "FAIL" "Not logged in to npm. Please run 'npm login'"
    exit 1
fi

# Step 11: Check if package name is available
print_status "STEP" "Checking package availability..."
if npm view "debugger-core" >/dev/null 2>&1; then
    print_status "WARN" "Package 'debugger-core' already exists on npm"
    read -p "Continue with publish? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_status "INFO" "Publish cancelled"
        exit 1
    fi
else
    print_status "SUCCESS" "Package name 'debugger-core' is available"
fi

# Step 12: Update package name for publishing
print_status "STEP" "Updating package name to 'debugger-core'..."
if sed -i '' 's/"name": "@project-debugger\/core"/"name": "debugger-core"/' package.json; then
    print_status "SUCCESS" "Package name updated to 'debugger-core'"
else
    print_status "FAIL" "Failed to update package name"
    exit 1
fi

# Step 13: Publish to npm
print_status "STEP" "Publishing to npm..."
if npm publish --access public; then
    print_status "SUCCESS" "Package published successfully to npm!"
    print_status "INFO" "Package: debugger-core@$NEW_VERSION"
    print_status "INFO" "NPM URL: https://www.npmjs.com/package/debugger-core"
else
    print_status "FAIL" "Failed to publish package"
    exit 1
fi

# Step 14: Restore original package name
print_status "STEP" "Restoring original package name..."
if sed -i '' 's/"name": "debugger-core"/"name": "@project-debugger\/core"/' package.json; then
    print_status "SUCCESS" "Package name restored"
else
    print_status "WARN" "Failed to restore package name"
fi

# Step 15: Create git tag
print_status "STEP" "Creating git tag..."
if git add package.json && git commit -m "chore: publish debugger-core@$NEW_VERSION" && git tag "v$NEW_VERSION"; then
    print_status "SUCCESS" "Git tag v$NEW_VERSION created"
else
    print_status "WARN" "Failed to create git tag"
fi

echo ""
print_status "SUCCESS" "🎉 Package published successfully!"
print_status "INFO" "Package: debugger-core@$NEW_VERSION"
print_status "INFO" "NPM URL: https://www.npmjs.com/package/debugger-core"
print_status "INFO" "Install with: npm install debugger-core" 