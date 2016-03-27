var VERSION = '5';

var CACHE_NAME = 'appmanifest-deps-v' + VERSION;

importScripts('gh-pages/sw-toolbox.js');

toolbox.options.cache.name = CACHE_NAME;

var resources = [
  './',
  'gh-pages/client.js',
  'gh-pages/worker.js',
  'gh-pages/styles.css',
  'sw.js',
  'gh-pages/sw-toolbox.js',

  'https://npmcdn.com/jsoneditor@5.2.0/dist/jsoneditor.min.css',
  'https://npmcdn.com/redux@3.3.1/dist/redux.min.js',
  'https://npmcdn.com/jsoneditor@5.2.0/dist/jsoneditor.min.js',

  'dist/manifest-parser.min.js'
];

toolbox.precache(resources);

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});


toolbox.router.get('gh-pages/*', toolbox.cacheFirst);
toolbox.router.get('dist/*', toolbox.cacheFirst);
toolbox.router.get('/*', toolbox.cacheFirst, {origin: 'https://npmcdn.com'});
toolbox.router.get('/*', toolbox.cacheFirst);
