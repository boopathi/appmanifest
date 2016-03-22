# appmanifest

Validate web app manifest (http://w3c.github.io/manifest)

## Support

### Parsing

Spec: http://w3c.github.io/manifest/#processing

The parser helps in identifying possible mistakes in your manifest.json file in the following fields.

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

### Installability Signals

Spec: http://w3c.github.io/manifest/#installability-signals

This tools is to identify from a URL to provide you warnings about some of your app installability signals - to make it more installable - Does that even mean anything? Whatever.

+ [ ] link associativity with manifest & contains at least `name` and a suitable icon
+ [ ] Served over HTTPS
+ [ ] CSP

Note: There are a few others that cannot be checked with this tool. Feel free to visit the link mentioned above to help making your manifests better and give the browser possible installability signals.

### License

MIT License - http://boopathi.mit-license.org/
