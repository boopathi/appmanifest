//
//
// Based on the algorithm defined in the spec
// http://w3c.github.io/manifest/#dfn-steps-for-processing-a-density-member-of-an-image
//
//
export default function image_density ({image, logger: _logger, key}) {

  const logger = _logger(key, "image_density");

  // step 1
  const descriptor = Object.getOwnPropertyDescriptor(image, "density");
  if (typeof descriptor === "undefined") {
    logger.warn(`image density is empty.`);
    // step 1.0
    return false;
  }
  const {value} = descriptor;

  // step 3
  const result = parseFloat(value);

  // step 4
  if (isNaN(result) || result === Infinity || result < 0) {
    logger.error(`density = ${result}`);
    // step 4.2
    return false;
  }

  return result;

}
