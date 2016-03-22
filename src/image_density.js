//
//
// Based on the algorithm defined in the spec
// http://w3c.github.io/manifest/#dfn-steps-for-processing-a-density-member-of-an-image
//
//
import contentType from 'content-type';

export default function image_density ({image, logger: _logger}) {

  let logger = _logger("icons > image_density");

  // step 1
  let descriptor = Object.getOwnPropertyDescriptor(image, "density");
  if (typeof descriptor === "undefined") {
    logger.warn(`image density is empty.`);
    // step 1.0
    return false;
  }
  let {value} = descriptor;

  // step 3
  let result = parseFloat(value);

  // step 4
  if (result === NaN || result === Infinity || result < 0) {
    logger.warn(`density = ${result}`);
    // step 4.2
    return false;
  }

  return result;

}
