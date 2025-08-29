#!/bin/bash

PWD=$(pwd)

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

cd ~/.n8n/custom
pnpm install

if [[ "$?" != "0" ]] ; then
  echo "Install failed"
  cd $PWD
  exit
fi

cd $PWD

N8N_LOG_LEVEL=debug \
CODE_ENABLE_STDOUT=true \
n8n

