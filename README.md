# mkgs-parcel

mkg's default parcel configuration

# Todo

- [x] google-fonts & strip-index-html v2 port
- [ ] test if everything works so far
- [ ] imagemin
- [ ] expand list...

# Policy

- Only plugins that do non-invasive changes (those that change site functionality) are added here
- `parcel-transformer-google-fonts` for example keeps the basic functionality (google fonts dependency), `parcel-transformer-localize` for example does not (changes the site paths)

# Using the scripts

Using scripty you can automate the workflow for publishing to a known IPFS node

```
ln -s node_modules/mkgs-parcel/scripts/ .
npm i scripty
```

Add this to the scripts section

```
  "scripts": {
    "start": "scripty",
    "build": "scripty",
    "publish": "scripty"
  },
```

You need to create an `.ipfs-publish-config` at the project root

```
# config for mkgs-parcel

ENTRY=public/index.html
FLAGS_BUILD=()
FLAGS_START=()

DNS_PROV=cf
DOMAIN=your-domain.tld
```

And an `.ipfs-publish-config` at the global level for the node configuration

```
# this is the node you will publish too. for dev leave this as localhost.
EXTERNAL_API="/ip6/::1/tcp/5001"
```
