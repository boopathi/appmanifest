//
//
// Based on the algorithm defined in the spec
// https://html.spec.whatwg.org/#attr-link-sizes
//
//
export default function attr_link_sizes ({sizesStr, logger: _logger}) {

  const logger = _logger("icons", "image_sizes", "attr_link_sizes");

  const sizesArray = sizesStr.split(/\s/);
  const sizesSet = new Set(sizesArray);
  if (sizesSet.size < sizesArray.length)
    logger.warn(`Duplicate entities in sizes - ${sizesArray}`);

  return Array.from(sizesSet)
    .filter(size => {
      if (size === "any") return true;
      let sizeEntities = size.split(/x|X/);
      if (sizeEntities[0][0] === '0') {
        logger.warn(`Ignoring size. Width starts with 0 in ${size}`);
        return false;
      }
      if (sizeEntities[1][0] === '0') {
        logger.warn(`Ignoring size. Height starts with 0 in ${size}`);
        return false;
      }
      if (!isNonNegativeInteger(sizeEntities[0])) {
        logger.warn(`Ignoring size. Width should be a non negative integer in ${size}`);
        return false;
      }
      if (!isNonNegativeInteger(sizeEntities[1])) {
        logger.warn(`Ignoring size. Height should be a non negative integer in ${size}`);
        return false;
      }
      return true;
    });
}

export function isNonNegativeInteger(n) {
  return n >>> 0 === parseFloat(n);
}
