#!/bin/bash

# Exit with nonzero exit code if anything fails
set -e

# Build the project
echo "Building the project..."

# clear the build directory
rm -rf ./.build

# create the build directory
mkdir ./.build

# run esbuild
INPUT_FILES=$(find . | grep -e ".*\.js$" -e ".*\.ts$" -e ".*\.cjs$" -e ".*\.cts$" -e ".*\.mjs$" -e ".*\.mts$" -e ".*\.jsx$" -e ".*\.tsx$" | grep -v ".*node_modules/*" | grep -v ".build.*")

 

npx -y esbuild $INPUT_FILES \
--bundle \
--sourcemap \
--log-level="warning" \
--target="node18" \
--platform="node" \
--format="cjs" \
--outbase="." \
--outdir="./.build"
