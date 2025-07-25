#!/bin/bash

# Exit on error
set -e

# Remove yarn.lock to force npm usage
rm -f yarn.lock

# Install dependencies using npm
npm install --no-package-lock

# Build the project
npm run build

echo "Build completed successfully!"