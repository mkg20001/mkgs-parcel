#!/bin/bash

set -e

. "$PWD/.ipfs-publish-config"

npx parcel "$ENTRY" "${FLAGS_START[@]}"
