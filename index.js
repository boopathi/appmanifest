var parser = require('./lib/manifest-parser').default;

var result = parser({
  manifest: JSON.stringify({
    start_url: "index.html",
    display: "fullscreen",
    orientation: "a",
    name: "Example.com | A progressive web app",
    icons: [
      {
        src: "./image.png",
        sizes: "50x50 60x60"
      }
    ],
    theme_color: "black",
    background_color: "white"
  }),
  manifestUrl: "https://www.example.com/manifest.json",
  documentUrl: "https://www.example.com"
});

var URL = require('whatwg-url').URL;

function replacer (key, value) {
  if (value instanceof URL) return value.href;
  return value;
}

console.log(JSON.stringify(result, replacer, 2));
