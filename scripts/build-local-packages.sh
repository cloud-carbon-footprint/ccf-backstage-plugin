#!/bin/sh

#
# © 2021 Thoughtworks, Inc.
#

# Creates a local package build for testing the backstage plugin.
# Requires path to a locally installed backstage instance as a requirement

# Intended to be executed from project root directory
targetProjectPath=$1

# Function to print error message and exit
exit_with_error() {
  echo "$1"
  exit 1
}

# Check for valid current directory and target path
[ "$(basename "$(pwd)")" = "ccf-backstage-plugin"  ] || exit_with_error "Please run this script from the root directory of the project"
[ -d "$targetProjectPath" ] || exit_with_error "Please provide a valid path to a local backstage instance"

# Clean and build packages
yarn clean
yarn build

# Function to pack and copy packages
pack_and_copy() {
  # If the argument if "frontend", assign the cp destination to the name of "app" instead
  if [ "$1" = "frontend" ]; then
    cpDestination="app"
  else
    cpDestination="$1"
  fi
  cd "plugins/$1"
  yarn pack
  cp cloud-carbon-footprint-backstage-plugin-$1-*.tgz ../../$targetProjectPath/packages/$cpDestination || exit_with_error "Failed to copy package to target project"
  cd ../../
}

# Create local npm package, and copy packages to target project
pack_and_copy "backend"
pack_and_copy "frontend"

# Go to root directory of Backstage Instance, then clean and install packages
cd $targetProjectPath
yarn cache clean
find . -name "node_modules" -type d -exec rm -rf {} +
rm yarn.lock
yarn install

echo "CCF plugin packages have been built and copied into $targetProjectPath successfully! ✨"