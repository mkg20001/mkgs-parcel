#!/bin/bash

set -e

DIR=$(readlink -f "$0")
DIR=$(dirname "$DIR")
DIR=$(dirname "$DIR")

CMD=(npm run build)

. "$HOME/.ipfs-publish-config"
. "$DIR/.ipfs-publish-config"
"${CMD[@]}"

HASH=$(ipfs add -Qr "dist" --api="$EXTERNAL_API")
ipfs-dnslink-update "$DNS_PROV" "$DOMAIN" "/ipfs/$HASH"
