importScripts('../dist/manifest-parser.min.js');

self.onmessage = function(e) {
  'use strict';
  let action = e.data;

  let logs = [], errors = [], warnings = [];
  function logger() {
    return {
      log(m) { logs.push(m); },
      warn(m) { warnings.push(m); },
      error(m) { errors.push(m); }
    };
  }

  let processedManifest;

  switch (action.type) {
    case 'MANIFEST_JSON':
      processedManifest = ManifestParser.default(Object.assign({
        logger: logger
      }, action.data));
      break;
    case 'MANIFEST_URL':
      // TODO
  }

  processedManifest = JSON.parse(JSON.stringify(processedManifest, UrlReplacer));

  function UrlReplacer (key, value) {
    if (value && typeof value.href !== 'undefined') return value.href;
    return value;
  }

  postMessage({
    type: 'MANIFEST_RESULT',
    data: { logs, errors, warnings, result: processedManifest }
  });

};
