//
//
// Based on the algorithm defined in the spec
// http://w3c.github.io/manifest/#dfn-steps-for-processing-a-sizes-member-of-an-image
//
//
import attr_link_sizes from './attr_link_sizes';

export default function image_src ({image, logger: _logger}) {

  let logger = _logger("icons > image_sizes");

  // step 1
  let sizes = [];

  // step 2
  let descriptor = Object.getOwnPropertyDescriptor(image, "sizes");
  if (typeof descriptor === "undefined") {
    logger.warn(`image sizes is empty.`);
    // step 4.2
    return void 0;
  }
  let {value} = descriptor;

  // step 3
  let type = typeof value;

  // step 4
  if (type !== "string") {
    // step 4.1
    if (type !== "undefined")
      logger.warn(`Type ${type} is not supported`);
    // step 4.2
    return void 0;
  }

  // step 5
  let keywords = attr_link_sizes({sizesStr: value, logger: _logger});

  // step 6
  keywords.forEach(keyword => sizes.push(keyword.toLowerCase()));

  // step 7
  return sizes;
}
