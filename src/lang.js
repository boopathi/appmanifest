//
//
// Based on the algorithm defined in the spec
// http://w3c.github.io/manifest/#dfn-steps-for-processing-the-lang-member
//
//

// from Ecma spec
// http://www.ecma-international.org/ecma-402/1.0/#sec-6.2.2
// BC47 (RFC 5646) on npm :) :) :)
// https://www.npmjs.com/package/language-tags

// also on
// https://github.com/andyearnshaw/Intl.js/blob/master/src/6.locales-currencies-tz.js
import {IsStructurallyValidLanguageTag, CanonicalizeLanguageTag} from 'intl/lib/6.locales-currencies-tz';

export default function orientation ({manifest, logger: _logger}) {

  let logger = _logger("lang");

  // step 1
  let descriptor = Object.getOwnPropertyDescriptor(manifest, "lang");
  if (typeof descriptor === "undefined") {
    logger.warn(`name is empty.`);
    // step 2.2
    return void 0;
  }
  let {value} = descriptor;

  // step 2
  let type = typeof value;
  if (type !== "string") {
    // step 2.1
    if (type !== "undefined")
      logger.warn(`Type ${typeof value} is not supported`);
    // step 2.2
    return void 0;
  }

  // step 3
  // trim value
  let tag = String.prototype.trim.call(value);

  // step 4
  if (!IsStructurallyValidLanguageTag(tag)) {
    logger.warn(`The value - "${tag}" is invalid`);
    return void 0;
  }

  // step 5
  return CanonicalizeLanguageTag(tag);

}
