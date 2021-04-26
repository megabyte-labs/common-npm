#!/bin/bash

# This script performs maintenance on this repository. It ensures git submodules are
# installed and then copies over base files from the modules. It also generates the
# documentation.

set -ex

PROJECT_TYPE=npm

# Retrieve latest version of the submodules
if [ ! -d "./.modules/docs" ]; then
  cd ./.modules
  git submodule add -b master https://gitlab.com/megabyte-space/documentation/$PROJECT_TYPE.git docs
  cd ..
else
  cd ./.modules/docs
  git checkout master && git pull origin master
  cd ../..
fi
if [ ! -d "./.modules/shared" ]; then
  cd ./.modules
  git submodule add -b master https://gitlab.com/megabyte-space/common/shared.git
  cd ..
else
  cd ./.modules/shared
  git checkout master && git pull origin master
  cd ../..
fi

# Copy files from the shared module
cp -Rf ./.modules/shared/.github .
cp -Rf ./.modules/shared/.gitlab .
cp -Rf ./.modules/shared/.vscode .
cp ./.modules/shared/.cspell.json .cspell.json
cp ./.modules/shared/.editorconfig .editorconfig
cp ./.modules/shared/.eslintrc .eslintrc
cp ./.modules/shared/CODE_OF_CONDUCT.md CODE_OF_CONDUCT.md

# Copy files from the project type's module
cp -Rf ./.modules/$PROJECT_TYPE/files/ .

# Ensure the pre-commit hook is executable
chmod 755 .husky/pre-commit

# Generate the documentation
if [ -f ./.blueprint.json ]; then
  jq -s '.[0] * .[1]' .blueprint.json ./.modules/docs/common.json > __bp.json | true
  npx -y @appnest/readme generate --config __bp.json --input ./.modules/docs/blueprint-contributing.md --output CONTRIBUTING.md | true
  npx -y @appnest/readme generate --config __bp.json --input ./.blueprint.md | true
  rm __bp.json
  
  # Remove formatting error
  sed -i .bak 's/](#-/](#/g' README.md
  rm README.md.bak | true
  sed -i .bak 's/](#-/](#/g' CONTRIBUTING.md
  rm CONTRIBUTING.md.bak | true
fi

echo "*** Done updating meta files and generating documentation ***"
