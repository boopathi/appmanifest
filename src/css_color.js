//
//
// Based on the algorithm defined in the spec
// http://w3c.github.io/manifest/#dfn-steps-for-processing-the-theme_color-member
// http://w3c.github.io/manifest/#dfn-steps-for-processing-the-background_color-member
//
//
import {parseAComponentValue} from 'parse-css/parse-css';
import parseColor from 'parse-color';

export default function css_color ({manifest, logger: _logger, key}) {

  let logger = _logger(key);

  // step 1
  // http://w3c.github.io/manifest/#dfn-getownproperty
  let descriptor = Object.getOwnPropertyDescriptor(manifest, key);
  if (typeof descriptor === "undefined") {
    logger.warn(`${key} is empty`);
    // step 2.2
    return void 0;
  }
  let {value} = descriptor;

  // step 2
  let type = typeof value;
  if (type !== 'string') {
    // step 2.1
    if (type !== 'undefined')
      logger.warn(`Type ${type} is not supported for ${key}`);
    // step 2.2
    return void 0;
  }

  // step 3
  let potentialColor;
  try {
    potentialColor = parseAComponentValue(value);
  } catch(e) {
    if (e instanceof SyntaxError) {
      logger.warn(`Failed parsing ${key} - ${potentialColor}`);
      return void 0;
    }
    throw e;
  }

  // step 4
  // attempting to parse potential color as a CSS color -
  // I don't what this means, so I'm simply returning rgba value.
  let color = parseColor(potentialColor);
  // test one of the properties to be an array or not undefined
  if (!Array.isArray(color.rgb)) {
    logger.warn(`${key}(${potentialColor}) is not a valid color`);
    return void 0;
  }

  // step 5
  return color.rgba;

}
