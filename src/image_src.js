//
//
// Based on the algorithm defined in the spec
// http://w3c.github.io/manifest/#dfn-steps-for-processing-the-src-member-of-an-image
//
//
import {URL} from 'whatwg-url';

export default function image_src ({image, manifestUrl, logger: _logger, key}) {

  const logger = _logger(key, "image_src");

  // step 1
  const descriptor = Object.getOwnPropertyDescriptor(image, "src");
  if (typeof descriptor === "undefined") {
    logger.warn(`image src is empty.`);
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
      logger.warn(`Type ${type} is not supported`);
    // step 3.2
    return void 0;
  }

  // step 4
  const trimmedValue = String.prototype.trim.call(value);
  if (trimmedValue === "") {
    logger.error(`image src is empty`);
    return void 0;
  }

  // step 5
  return new URL(trimmedValue, manifestUrl);

}
