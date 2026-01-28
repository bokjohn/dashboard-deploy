#!/bin/bash
# Quick validation wrapper script

cd "$(dirname "$0")"
node validate.js data.json
exit $?
