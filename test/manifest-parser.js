'use strict';
const chai = require('chai');
const spies = require('chai-spies');
const URL = require('whatwg-url').URL;

chai.use(spies);

const should = chai.should, expect = chai.expect;

const DEBUG = 0;
const printf = DEBUG ? console.log.bind(console) : () => {};

const log = chai.spy(printf);
const warn = chai.spy(printf);
const error = chai.spy(printf);
const logspies = {log, warn, error};
const logger = chai.spy(function(name) {
  return logspies;
});

const manifestUrl = 'https://www.example.com/main/manifest.json';
const documentUrl = new URL('https://www.example.com/main/index.html').href;
const noop = () => {};
function runner (fn, manifest) {
  return fn({
    manifest,
    manifestUrl,
    documentUrl,
    start_url: suiteFunctions['start_url']({
      manifest,
      manifestUrl,
      documentUrl,
      logger: () => ({ log: noop, warn: noop, error: noop })
    }),
    logger
  });
}

const suiteFunctions =
  [
    'start_url',
    'display',
    'orientation',
    'name',
    'short_name',
    'scope',
  ]
  .map(mod => ({ [mod]: require('../lib/' + mod).default}))
  .reduce((p, c) => Object.assign(p, c), {});

function toHref(url) {
  return url.href;
}

// [ input, <spy_to_be_called>, return_value, f(return_value) ]
const suite = {
  start_url: [
    [ , 'warn', documentUrl, toHref ],
    [ '', 'warn', documentUrl, toHref ],
    [ [], 'warn', documentUrl, toHref ],
    [ 'some', , new URL('./some', documentUrl).href, toHref ],
    [ 'https://someotherdomain.com/', 'error', documentUrl, toHref ]
  ],
  display: [
    [ , 'warn', 'browser' ],
    [ '', 'error', 'browser' ],
    [ [], 'warn', 'browser' ],
    [ 'fullscreen', , 'fullscreen' ],
    [ 'standalone', , 'standalone' ],
    [ 'minimal-ui', , 'minimal-ui' ],
    [ 'browser', , 'browser' ],
    [ 'somerandomstring', 'error', 'browser']
  ],
  orientation: [
    [ , 'warn', '' ],
    [ 'any', , 'any' ],
    [ 'natural', , 'natural' ],
    [ 'landscape', , 'landscape' ],
    [ 'portrait', , 'portrait' ],
    [ 'portrait-primary', , 'portrait-primary' ],
    [ 'portrait-secondary', , 'portrait-secondary' ],
    [ 'landscape-primary', , 'landscape-primary' ],
    [ 'landscape-secondary', , 'landscape-secondary' ],
    [ 'somerandomstring', 'error', '' ]
  ],
  name: [
    [ , 'error', ],
    [ 'some', , 'some' ]
  ],
  short_name: [
    [ , 'warn', ],
    [ 'some', , 'some' ]
  ],
  scope: [
    // pass null and nothing should throw
    [ ],
    [ [], 'warn' ],
    [ 'https://different.example.com', 'error' ],
    [ '/diff-scope', 'error' ],
    [ '/main', , new URL('/main', manifestUrl).href, toHref ]
  ]
}

describe('manifest-parser-suite', function() {

  afterEach(function() {
    logger.reset();
    warn.reset();
    log.reset();
    error.reset();
  });

  Object.keys(suite).forEach(entity => {

    const fn = suiteFunctions[entity];
    const tests = suite[entity];

    it ('should call logger with correct name - ' + entity, function () {
      runner(fn, {});
      expect(logger).to.have.been.called.with(entity);
    });

    describe(entity, function() {

      tests.forEach((test, i) => {

        it ('test - ' + i, function() {
          let ret;
          if (typeof test[0] === 'undefined')
            ret = runner(fn, {});
          else
            ret = runner(fn, { [entity]: test[0] });
          if (test[3]) ret = test[3](ret);
          if (typeof test[1] !== 'undefined') {
            Object.keys(logspies).forEach(k => {
              if (k === test[1])
                expect(logspies[k]).to.have.been.called();
              else
                expect(logspies[k]).to.not.have.been.called();
            });
          }
          expect(ret).to.equal(test[2]);
        });

      });

    });

  });

});
