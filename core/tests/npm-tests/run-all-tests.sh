#!/bin/bash

# Test runner for all npm module types
# Run with: ./tests/npm-tests/run-all-tests.sh

set -e

echo "🧪 Running all npm module tests..."
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    case $status in
        "PASS")
            echo -e "${GREEN}✅ PASS${NC}: $message"
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
    esac
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_status "FAIL" "Please run this script from the core directory"
    exit 1
fi

# Check if dist files exist
if [ ! -f "dist/esm/index.js" ] || [ ! -f "dist/cjs/index.js" ] || [ ! -f "dist/core.min.js" ]; then
    print_status "WARN" "Dist files not found. Building first..."
    npm run build
fi

echo ""
print_status "INFO" "Testing ES Module (ESM)..."
if node tests/npm-tests/esm-test.mjs; then
    print_status "PASS" "ES Module tests completed successfully"
else
    print_status "FAIL" "ES Module tests failed"
    exit 1
fi

echo ""
print_status "INFO" "Testing CommonJS..."
if node tests/npm-tests/cjs-test.cjs; then
    print_status "PASS" "CommonJS tests completed successfully"
else
    print_status "FAIL" "CommonJS tests failed"
    exit 1
fi

echo ""
print_status "INFO" "UMD/CDN tests require a browser environment"
print_status "INFO" "Open tests/npm-tests/umd-test.html in a browser to test UMD/CDN functionality"

echo ""
print_status "INFO" "All Node.js tests completed successfully! 🎉"
print_status "INFO" "For UMD/CDN testing, open: tests/npm-tests/umd-test.html" 