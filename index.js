var parser = require('./lib/manifest-parser').default;

var result = parser({
  manifest: JSON.stringify({
    start_url: "index.html"
  }),
  manifestUrl: "google.com/manifest.json",
  documentUrl: "https://www.google.com"
});

console.log(result, result.hostname, result.href);
