#!/bin/bash

# This script performs maintenance on NPM package repositories. It ensures git submodules
# are installed and then copies over base files from the modules. It also generates the
# documentation and performs other miscellaneous tasks.

set -e

# Ensure shared submodule is present
if [ ! -d "./.modules/shared" ]; then
  mkdir -p ./.modules
  git submodule add -b master https://gitlab.com/megabyte-space/common/shared.git ./.modules/shared
else
  cd ./.modules/shared
  git checkout master && git pull origin master --ff-only
  cd ../..
fi

# shellcheck disable=SC1091
#source "./.modules/shared/update.lib.sh"

# Install software dependencies if they are missing
#ensure_node_installed
#ensure_jq_installed

# Ensure documentation partials submodule is present and in sync with master
#ensure_project_docs_submodule_latest

# Apply updates from shared files
#copy_project_files_and_generate_package_json
#generate_documentation
#misc_fixes
