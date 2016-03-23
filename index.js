var parser = require('./lib/manifest-parser').default;
var installability = require('./lib/installability').default;

var result = installability({
  indexHtml: '<html></html>'
});

// var result = parser({
//   manifest: JSON.stringify({
//     start_url: "index.html",
//     display: "fullscreen",
//     orientation: "a",
//     name: "Example.com | A progressive web app",
//     icons: [
//       {
//         src: "./image.png",
//         sizes: "50x50 60x60"
//       }
//     ],
//     theme_color: "#fedcba",
//     background_color: "white"
//   }),
//   manifestUrl: "https://www.example.com/manifest.json",
//   documentUrl: "https://www.example.com"
// });
//
// // sample test
// var flipkartManifest = JSON.stringify({
//   "name": "Flipkart Lite",
//   "short_name": "Flipkart Lite",
//   "icons": [
//       {
//           "src": "https://img1a.flixcart.com/www/linchpin/batman-returns/logo_lite-cbb3574d.png",
//           "sizes": "192x192",
//           "type": "image/png"
//       }
//   ],
//   "gcm_sender_id": "656085505957",
//   "gcm_user_visible_only": true,
//   "start_url": "/?utm_source=d3d3LmZsaXBrYXJ0Y2FyZWVycy5jb20&utm_medium=mobile&utm_campaign=homescreen",
//   "permissions": [
//       "gcm"
//   ],
//   "orientation": "portrait",
//   "display": "standalone",
//   "theme_color": "#006cb4",
//   "background_color": "#006cb4"
// });
//
// var flipkart = parser({
//   manifest: flipkartManifest,
//   manifestUrl: "https://www.flipkart.com/manifest.json",
//   documentUrl: "https://www.flipkart.com"
// });
//
//
// //
// //
// // Run and format and print the output
// //
// //
//
// var URL = require('whatwg-url').URL;
//
// function replacer (key, value) {
//   if (value instanceof URL) return value.href;
//   return value;
// }
//
// console.log(JSON.stringify(result, replacer, 2));
// console.log(JSON.stringify(flipkart, replacer, 2));
