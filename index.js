var parser = require('./lib/manifest-parser').default;

var result = parser({
  manifest: JSON.stringify({
    start_url: "index.html",
    display: "fullscreen",
    orientation: "a",
    name: "Example.com | A progressive web app"
  }),
  manifestUrl: "manifest.json",
  documentUrl: "https://www.example.com"
});

console.log(result);
