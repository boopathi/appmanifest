var parser = require('./lib/manifest-parser').default;

var result = parser({
  manifest: JSON.stringify({
    start_url: "index.html",
    display: "fullscreen"
  }),
  manifestUrl: "google.com/manifest.json",
  documentUrl: "https://www.google.com"
});

console.log(result);
