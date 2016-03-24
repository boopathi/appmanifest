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
      let json;
      try {
        json = editor.get();
      } catch (e) {
        // People are going to hate me for this
        resultLogs.innerHTML = "<ul><li class=error>ERROR PARSING JSON</li></ul>";
        ga('send', 'exception', {
          exDescription: e.name,
          exFatal: false
        });
        return;
      }
      store.dispatch({
        type: 'MANIFEST_JSON',
        data: {
          manifest: JSON.stringify(json),
          manifestUrl: 'https://www.example.com/manifest.json',
          documentUrl: 'https://www.example.com'
        },
        worker: true
      });
    }
  });
  editor.set({});

  const resultEditor = new JSONEditor(resultJson, {
    mode: 'code'
  });

  submit.addEventListener('click', function(e) {
    e.preventDefault();
    ga('send', 'event', 'RunButton', 'run');
    store.dispatch({
      type: 'MANIFEST_JSON',
      data: {
        manifest: JSON.stringify(editor.get()),
        manifestUrl: 'https://example.com/manifest.json',
        documentUrl: 'https://example.com/'
      },
      // this is how I understand an action that needs to be sent to worker
      worker: true
    });
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
    result.errors.forEach(e => r.appendChild(createLog('error', e)));
    result.warnings.forEach(w => r.appendChild(createLog('warning', w)));
    result.logs.forEach(l => r.appendChild(createLog('info', l)));
    resultLogs.innerHTML = "";
    resultLogs.appendChild(r);

    resultEditor.set(result.result);

  });

  function UrlReplacer (key, value) {
    if (value && typeof value.href !== 'undefined') return value.href;
    return value;
  }

  function createLog(className, text) {
    let li = document.createElement('li');
    li.innerText = text;
    li.className = className;
    return li;
  }

})();
