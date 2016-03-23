importScripts('../dist/appmanifest.min.js');

self.onmessage = function(e) {
  'use strict';
  let action = e.data;

  let logs = [], errors = [], warnings = [];
  function logger() {
    return {
      log(m) { logs.push(m); },
      warn(m) { warnings.push(m); },
      error(m) { errors.push(e); }
    };
  }

  let processedManifest;

  switch (action.type) {
    case 'MANIFEST_JSON':
      processedManifest = AppManifest.manifestParser(Object.assign({
        logger: logger
      }, action.data));
      break;
    case 'MANIFEST_URL':
      // TODO
  }

  postMessage({
    type: 'MANIFEST_RESULT',
    data: { logs, errors, warnings, result: processedManifest }
  });

};
