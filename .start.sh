#!/bin/bash

# This script performs maintenance on NPM package repositories. It ensures git submodules are
# installed and then copies over base files from the modules. It also generates the
# documentation and performs other miscellaneous tasks.

set -e

# shellcheck disable=SC2154
if [ "$container" != 'docker' ]; then
  curl -sL https://git.io/_has | bash -s git jq node npm wget
fi

export REPO_TYPE=npm
git pull origin master
git submodule update --init --recursive
if [ ! -f "./.modules/${REPO_TYPE}/update.sh" ]; then
  mkdir -p ./.modules
  git submodule add -b master https://gitlab.com/megabyte-space/common/$REPO_TYPE.git ./.modules/$REPO_TYPE
else
  cd ./.modules/$REPO_TYPE
  git checkout master && git pull origin master --ff-only
  cd ../..
fi
bash ./.modules/$REPO_TYPE/update.sh
