#!/bin/bash

# Exit on error
set -e

# Install dependencies using npm instead of yarn
npm install

# Build the project
npm run build

echo "Build completed successfully!"