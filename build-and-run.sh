#!/bin/bash

PWD=$(pwd)

pnpm lint
if [[ "$?" != "0" ]] ; then
  echo "Lint failed"
  cd $PWD
  exit
fi

pnpm build
if [[ "$?" != "0" ]] ; then
  echo "Build failed"
  exit
fi

cd ~/.n8n/custom
pnpm install

if [[ "$?" != "0" ]] ; then
  echo "Install failed"
  cd $PWD
  exit
fi

cd $PWD

LANGCHAIN_TRACING_V2=true \
LANGCHAIN_API_KEY=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 \
LANGCHAIN_PROJECT=n8n \
N8N_LOG_LEVEL=debug \
CODE_ENABLE_STDOUT=true \
n8n

