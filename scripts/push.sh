#!/bin/bash

if [ -n "$1" ]; then
  MSG="$1"
else
  read -p "Enter commit message: " MSG
fi

git add .
git commit -m "$MSG"
git push origin main
