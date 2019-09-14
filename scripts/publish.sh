#!/bin/bash

set -e

CMD=(npm run build)

. "$HOME/.ipfs-publish-config"
. "$PWD/.ipfs-publish-config"
"${CMD[@]}"

HASH=$(ipfs add -Qr "dist" --api="$EXTERNAL_API")
ipfs-dnslink-update "$DNS_PROV" "$DOMAIN" "/ipfs/$HASH"
