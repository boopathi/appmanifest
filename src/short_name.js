//
//
// Based on the algorithm defined in the spec
// http://w3c.github.io/manifest/#dfn-steps-for-processing-the-short_name-member
//
//

export default function short_name ({manifest, logger: _logger}) {

  const logger = _logger("short_name");

  // step 1
  const descriptor = Object.getOwnPropertyDescriptor(manifest, "short_name");
  if (typeof descriptor === "undefined") {
    logger.warn(`short_name is empty.`);
    // step 2.2
    return void 0;
  }
  const {value} = descriptor;

  // step 2
  const type = typeof value;
  if (type !== "string") {
    // step 2.1
    if (type !== "undefined")
      logger.warn(`Type ${typeof value} is not supported`);
    // step 2.2
    return void 0;
  }

  // step 3
  // trim value and return
  return String.prototype.trim.call(value);

}
