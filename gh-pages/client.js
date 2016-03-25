var sampleJson = {
  "lang": "en",
  "dir": "ltr",
  "name": "Super Racer 2000",
  "short_name": "Racer2K",
  "icons": [{
        "src": "icon/lowres",
        "sizes": "64x64",
        "type": "image/webp"
      }, {
        "src": "icon/hd_small",
        "sizes": "64x64"
      }, {
        "src": "icon/hd_hi",
        "sizes": "128x128",
        "density": 2
      }],
  "splash_screens": [{
        "src": "splash/lowres",
        "sizes": "320x240"
      }, {
        "src": "splash/hd_small",
        "sizes": "1334x750"
      }, {
        "src": "splash/hd_hi",
        "sizes": "1920x1080",
        "density": 3
      }],
  "scope": "/racer/",
  "start_url": "/racer/start.html",
  "display": "fullscreen",
  "orientation": "landscape",
  "theme_color": "aliceblue",
  "background_color": "red"
};

function webWorkerMiddlewareFactory (scriptUrl) {
  'use strict';
  let dispatch = null;
  const worker = new Worker(scriptUrl);

  // worker sends back actions
  worker.onmessage = e => {
    if (dispatch) dispatch(e.data);
  }

  // middleware signature store => next => action => next()
  return store => {
    // assign the dispatch that onmessage can use
    dispatch = store.dispatch;
    return next => action => {
      // this is how I understand an action that needs to be sent to worker
      if (!action.worker) return next(action);
      // worker receives action
      worker.postMessage(action);
      // pass on
      return next(Object.assign({ worker: true }, action));
    }
  }
}

(function() {
  'use strict';

  let worker = new Worker('gh-pages/worker.js');

  function reducer(state, action) {
    switch (action.type) {
      case 'MANIFEST_JSON':
        return state;
      case 'MANIFEST_RESULT':
        return state.concat(action.data);
      case 'EDITOR_GET_ERROR':
        return state.concat(action.data);
      default:
        return state;
    }
  }

  let store = Redux.createStore(
    reducer,
    [],
    Redux.applyMiddleware(webWorkerMiddlewareFactory('gh-pages/worker.js'))
  );

  // the view stuff
  const manifestJson = document.getElementById('manifest-json');
  const submit = document.getElementById('submit');
  const resultLogs = document.getElementById('result-logs');
  const resultJson = document.getElementById('result-json');

  const editor = new JSONEditor(manifestJson, {
    mode: "code",
    onChange: function() {
      store.dispatch(createParseAction());
    }
  });
  editor.set(sampleJson);

  const resultEditor = new JSONEditor(resultJson, {
    mode: 'code'
  });

  const createParseAction = function () {
    let json;
    try {
      json = editor.get();
    } catch (e) {
      ga('send', 'exception', {
        exDescription: e.name,
        exFatal: false
      });
      return {
        type: 'EDITOR_GET_ERROR',
        data: {
          errors: [e.message]
        }
      }
    }
    return {
      type: 'MANIFEST_JSON',
      data: {
        manifest: JSON.stringify(json),
        manifestUrl: 'https://www.example.com/manifest.json',
        documentUrl: 'https://www.example.com'
      },
      // this is how I understand an action that needs to be sent to worker
      worker: true
    }
  }

  window.addEventListener('DOMContentLoaded', function() {
    store.dispatch(createParseAction());
  });

  submit.addEventListener('click', function(e) {
    e.preventDefault();
    ga('send', 'event', 'RunButton', 'run');
    store.dispatch(createParseAction());
  });

  // the cheap ass diff
  // number of results
  let internalDOMState = {
    nResults: 0
  };

  store.subscribe(function update() {
    let r = document.createElement('ul');

    // shouldComponentUpdate
    let state = store.getState();
    if (internalDOMState.nResults === state.length) return;

    internalDOMState.nResults++;
    let result = state[state.length-1];
    Array.isArray(result.errors) && result.errors.forEach(e => r.appendChild(createLog('error', e)));
    Array.isArray(result.warnings) && result.warnings.forEach(w => r.appendChild(createLog('warning', w)));
    Array.isArray(result.logs) && result.logs.forEach(l => r.appendChild(createLog('info', l)));
    resultLogs.innerHTML = "";
    resultLogs.appendChild(r);

    resultEditor.set(result.result);

  });

  function createLog(className, text) {
    let li = document.createElement('li');
    li.innerText = text;
    li.className = className;
    return li;
  }

})();


(function() {
  'use strict';

  if (navigator.serviceWorker)
    navigator
      .serviceWorker
      .register('sw.js')
      .then(r => console.log('Available Offline'))
      .catch(e => console.log.bind(console));
})();
