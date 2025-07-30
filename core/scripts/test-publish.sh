#!/bin/bash

# Test script for publish.sh (dry run)
# This script tests the publish script without actually publishing

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🧪 Testing publish script (dry run)...${NC}"

# Test 1: Check if publish script exists
if [ -f "scripts/publish.sh" ]; then
    echo -e "${GREEN}✅ Publish script exists${NC}"
else
    echo "❌ Publish script not found"
    exit 1
fi

# Test 2: Check if script is executable
if [ -x "scripts/publish.sh" ]; then
    echo -e "${GREEN}✅ Publish script is executable${NC}"
else
    echo "❌ Publish script is not executable"
    exit 1
fi

# Test 3: Check if package.json has the publish script
if grep -q '"publish:npm"' package.json; then
    echo -e "${GREEN}✅ Package.json has publish:npm script${NC}"
else
    echo "❌ Package.json missing publish:npm script"
    exit 1
fi

# Test 4: Check if all required scripts exist
echo -e "${BLUE}Checking required npm scripts...${NC}"

REQUIRED_SCRIPTS=("lint" "type-check" "test" "test:npm" "build")

for script in "${REQUIRED_SCRIPTS[@]}"; do
    if grep -q "\"$script\"" package.json; then
        echo -e "${GREEN}✅ $script script exists${NC}"
    else
        echo "❌ $script script missing"
        exit 1
    fi
done

# Test 5: Check if dist files exist (after build)
echo -e "${BLUE}Checking build outputs...${NC}"
if [ -f "dist/esm/index.js" ] && [ -f "dist/cjs/index.js" ] && [ -f "dist/core.min.js" ] && [ -f "dist/types/index.d.ts" ]; then
    echo -e "${GREEN}✅ All build outputs exist${NC}"
else
    echo "⚠️  Build outputs missing, running build..."
    npm run build
    if [ -f "dist/esm/index.js" ] && [ -f "dist/cjs/index.js" ] && [ -f "dist/core.min.js" ] && [ -f "dist/types/index.d.ts" ]; then
        echo -e "${GREEN}✅ Build outputs created successfully${NC}"
    else
        echo "❌ Failed to create build outputs"
        exit 1
    fi
fi

echo ""
echo -e "${GREEN}🎉 All publish script tests passed!${NC}"
echo ""
echo "To publish the package:"
echo "1. Commit your changes: git add . && git commit -m 'feat: ready for publish'"
echo "2. Login to npm: npm login"
echo "3. Run publish: npm run publish:npm"
echo "4. Or with specific version: npm run publish:npm 1.0.1" 