#!/bin/bash

set -e

. "$PWD/.ipfs-publish-config"

rm -rf dist

npx parcel build "$ENTRY" "${FLAGS_BUILD[@]}"
