//
//
// Based on the algorithm defined in the spec
// http://w3c.github.io/manifest/#dfn-steps-for-processing-the-display-member
//
//

// Based on
// http://w3c.github.io/manifest/#dfn-display-modes-values
const displayModes = {
  // value => fallback
  "fullscreen": "standalone",
  "standalone": 'minimal-ui',
  "minimal-ui": "browser",
  "browser": null // no fallback
};

export default function display ({manifest, logger: _logger}) {

  let logger = _logger("display");

  // step 1
  let descriptor = Object.getOwnPropertyDescriptor(manifest, "display");
  if (typeof descriptor === "undefined") {
    logger.warn(`display is empty. Using defaultDisplayMode - browser`);
    return "browser";
  }
  let {value} = descriptor;

  // step 2
  let type = typeof value;
  let trimmedValue = String.prototype.trim.call(value);
  let supported = Object.keys(displayModes).indexOf(trimmedValue) !== -1;
  if (type !== "string" || !supported) {
    // step 2.1
    if (type !== "undefined" && type !== "string")
      logger.warn(`Type ${typeof value} is not supported`);
    // step 2.2
    if (!supported)
      logger.warn(`display mode is not supported. Using defaultDisplayMode - browser`);
    // step 2.3
    // http://w3c.github.io/manifest/#dfn-fallback-display-mode
    return "browser";
  }

  // ignoring step 3, 4, 5
  logger.warn(`Assuming the display mode provided "${trimmedValue}" is supported by your browser`);
  return trimmedValue;
}
