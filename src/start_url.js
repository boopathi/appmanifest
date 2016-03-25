//
//
// Based on the algorithm defined in the spec
// http://w3c.github.io/manifest/#dfn-steps-for-processing-the-start_url-member
//
//
import {URL} from 'whatwg-url';
import same_origin from './same_origin';

export default function start_url ({manifest, manifestUrl, documentUrl, logger: _logger}) {

  const logger = _logger("start_url");

  // step 1
  // http://w3c.github.io/manifest/#dfn-getownproperty
  const descriptor = Object.getOwnPropertyDescriptor(manifest, "start_url");
  if (typeof descriptor === "undefined") {
    logger.warn(`start_url is not defined. Using documentUrl - ${documentUrl}`);
    return new URL(documentUrl);
  }
  const {value} = descriptor;

  // step 2 & 3
  const type = typeof value;
  if (type !== 'string' || value === "") {
    if (type !== 'undefined')
      logger.warn(`Type ${type} is not supported for start_url`);
    logger.warn(`start_url is empty. Using documentUrl - ${documentUrl}`);
    return new URL(documentUrl);
  }

  // step 4
  let url;
  try {
    url = new URL(value, manifestUrl);
  } catch (e) {
    // step 5
    logger.error(`Failed to parse URL to get start_url path - ${manifestUrl} .. ${value}
      Using documentUrl as start_url - ${documentUrl}`);
    return new URL(documentUrl);
  }

  // step 6
  // same-origin policy check
  if (!same_origin(url, new URL(documentUrl))) {
    logger.error(`start_url must be the same-origin as documentUrl of the top-level browsing context`);
    return new URL(documentUrl);
  }

  // step 7
  return url;

}
