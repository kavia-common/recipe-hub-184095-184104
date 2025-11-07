#!/bin/bash
cd /home/kavia/workspace/code-generation/recipe-hub-184095-184104/frontend_react
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

