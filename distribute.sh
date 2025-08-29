#!/bin/bash

#
# Distribution script for npm. It ensures that the package is built properly.
#

rm -Rf dist

pnpm lint
if [[ "$?" != "0" ]] ; then
  echo "Lint failed"
  cd $PWD
  exit 1
fi

pnpm build
if [[ "$?" != "0" ]] ; then
  echo "Build failed"
  exit 1
fi

npm publish --access public
