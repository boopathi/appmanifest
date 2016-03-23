//
//
// Based on the algorithm defined in the spec
// http://w3c.github.io/manifest/#dfn-within-scope
//
//

import {URL} from 'whatwg-url';
import same_origin from './same_origin';

export default function within_scope({targetUrl, scopeUrl, logger: _logger}) {

  const logger = _logger("scope > within_scope");

  // step 1
  if (typeof scopeUrl === "undefined")
    return true;

  // step 2
  let target;
  try {
    target = new URL(targetUrl);
  } catch(e) {
    logger.error(`Failed to parse targetUrl - ${targetUrl}`);
    return false;
  }

  // step 3 & 4 - modified to provide better warnings
  if (!same_origin(targetUrl, scopeUrl)) {
    logger.error(`targetUrl("${targetUrl}") must be the same origin as scopeUrl("${scopeUrl}")`);
    return false;
  }
  if (!targetUrl.pathname.startswith(scopeUrl)) {
    logger.error(`targetUrl("${targetUrl}") must be under the scope of scopeUrl("${scopeUrl}")`);
    return false;
  }

  return true;

}
