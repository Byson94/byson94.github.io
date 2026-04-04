#!/bin/bash
set -e

echo "Building WASM..."
wasm-pack build --target web

echo "Cleaning up..."
rm -f pkg/.gitignore

echo "Copying to Astro public..."
rm -rf ../public/psh/pkg
mkdir -p ../public/psh/pkg
cp -r pkg/* ../public/psh/pkg/

echo "Done!"