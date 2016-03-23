# appmanifest

Validate web app manifest (http://w3c.github.io/manifest)

\* Tries to follow the Spec as it is (as much as possible)

## Install

```
npm install appmanifest
```

## Usage

### API

```js
// result is the processed manifest object
var result = manifestParser({
  manifest: "<manifest json string>",
  manifestUrl: "https://example.com/manifest.json", // this is required to validate some urls
  documentUrl: "https://example.com/" // this is also required to validate some urls
  logger: function() { return { warn() {}, error(){}, log(){} } } // optional
});
```

If you don't want to pass manifestUrl and documentUrl, just use `example.com` urls as mentioned above.

#### Capture errors and warnings

You can pass your custom logger and capture all errors and warnings to compile and display later. The signature of the logger function is this.

```js
function Logger (name /* name of the param currently validated */) {
  return {
    warn(message) {
      // do your stuff
    },
    error (message) {
      // do your stuff
    },
    log (message) {
      // do your stuff
    }
  }
}
```

### Node

```js
const parse = require('appmanifest').manifestParser;
```

### Browser

1. You can bundle this with webpack / browserify
2. Generate your dist - `npm run dist`
3. Get it from CDN - https://npmcdn.com/appmanifest@0.0.1/dist/appmanifest.min.js

The library when obtained as a built bundle, exports UMD with `AppManifest` as the name.

## Features

### Processing

Spec: http://w3c.github.io/manifest/#processing

This helps in identifying possible mistakes in your manifest.json file in the following fields.

+ [x] start_url
+ [x] display
+ [x] orientation
+ [x] name
+ [ ] lang
+ [x] short_name
+ [x] icons
+ [x] splash_screens
+ [x] scope
+ [ ] related_applications
+ [ ] prefer_related_applications
+ [x] theme_color
+ [x] background_color

\* The unchecked ones are not yet implemented

### Installability Signals

Spec: http://w3c.github.io/manifest/#installability-signals

This tool is to identify from a URL, warnings about some of your app installability signals - to make it more installable - Does it even mean anything? Yes. It's a thing now. Live with it.

+ [ ] link associativity with manifest & contains at least `name` and a suitable icon
+ [ ] Served over HTTPS
+ [ ] CSP

\* The unchecked ones are not yet implemented

Note: There are a few others that cannot be checked with this tool. Feel free to visit the link mentioned above to help making your manifests better and give the browser possible installability signals.

### CONTRIBUTING

Contributions and ideas are always welcome. Create an issue to discuss.

#### Build

### License

MIT License - http://boopathi.mit-license.org/
