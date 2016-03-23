//
//
// Based on the algorithm defined in the spec
// http://w3c.github.io/manifest/#dfn-steps-for-processing-a-sizes-member-of-an-image
//
//
import attr_link_sizes from "./attr_link_sizes";

export default function image_sizes ({image, logger: _logger, key}) {

  const logger = _logger(key, "image_sizes");

  // step 1
  const sizes = [];

  // step 2
  const descriptor = Object.getOwnPropertyDescriptor(image, "sizes");
  if (typeof descriptor === "undefined") {
    logger.warn(`image sizes is empty.`);
    // step 4.2
    return void 0;
  }
  const {value} = descriptor;

  // step 3
  const type = typeof value;

  // step 4
  if (type !== "string") {
    // step 4.1
    if (type !== "undefined")
      logger.warn(`Type ${type} is not supported`);
    // step 4.2
    return void 0;
  }

  // step 5
  const keywords = attr_link_sizes({sizesStr: value, logger: _logger});

  // step 6
  keywords.forEach(keyword => sizes.push(keyword.toLowerCase()));

  // step 7
  return sizes;
}
