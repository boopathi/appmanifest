//
//
// Based on the algorithm defined in the spec
// http://w3c.github.io/manifest/#dfn-steps-for-processing-the-scope-member
//
//
import {URL} from 'whatwg-url';
import same_origin from './same_origin';
import within_scope from './within_scope';

export default function scope ({manifest, manifestUrl, documentUrl, start_url, logger: _logger}) {

  const logger = _logger("scope");

  // step 1
  const descriptor = Object.getOwnPropertyDescriptor(manifest, "scope");
  if (typeof descriptor === "undefined") {
    logger.warn(`scope is empty`);
    // step 3.2
    return void 0;
  }
  const {value} = descriptor;

  // step 2
  const type = typeof value;

  // step 3
  if (type !== "string") {
    // step 3.1
    if (type !== "undefined")
      logger.warn(`Type ${typeof value} is not supported`);
    // step 3.2
    return void 0;
  }

  // step 4
  let scopeUrl;
  try {
    scopeUrl = new URL(value, manifestUrl);
  } catch(e) {
    // step 5
    logger.warn(`Failed to parse url to get scope - ${manifestUrl} .. ${value}`);
    return void 0;
  }

  // step 6
  // same-origin policy check
  if (!same_origin(scopeUrl, new URL(documentUrl))) {
    logger.warn(`scope must be the same-origin as documentUrl of the application context`);
    return void 0;
  }

  // step 7
  if (!within_scope({scopeUrl, targetUrl: start_url, logger: _logger})) {
    logger.warn(`startUrl is not within scope of the navigation scope`);
    return void 0;
  }

  // step 8
  return scopeUrl;

}
