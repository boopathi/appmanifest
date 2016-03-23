//
//
// Based on the algorithm defined in the spec
// http://w3c.github.io/manifest/#dfn-steps-for-processing-the-orientation-member
//
//

// Based on
// https://www.w3.org/TR/screen-orientation/#orientationlocktype-enum
const OrientationLockTypeEnum = [
  "any",
  "natural",
  "landscape",
  "portrait",
  "portrait-primary",
  "portrait-secondary",
  "landscape-primary",
  "landscape-secondary"
];

export default function orientation ({manifest, display, logger: _logger}) {

  const logger = _logger("orientation");

  // step 1
  const descriptor = Object.getOwnPropertyDescriptor(manifest, "orientation");
  if (typeof descriptor === "undefined") {
    logger.warn(`Orientation is empty.`);
    // step 2.2
    return "";
  }
  const {value} = descriptor;

  // step 2
  const type = typeof value;
  if (type !== "string") {
    // step 2.1
    if (type !== "undefined")
      logger.warn(`Type ${typeof value} is not supported`);
    // step 2.2
    return "";
  }

  // step 3
  // trim value
  const result = String.prototype.trim.call(value);

  // step 4
  const supported = OrientationLockTypeEnum.indexOf(result) !== -1;
  if (!supported) {
    logger.error(`OrientationLockType is not supported. It should be one of -
${OrientationLockTypeEnum.toString()}`);
    // step 4.2
    return "";
  }

  // step 5
  logger.warn(`Assuming the combination of display mode ${display} and orientation ${result} is supported by your browser`);
  return result;
}
