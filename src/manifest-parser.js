//
//
// Based on the algorithm defined in the spec
// http://w3c.github.io/manifest/#dfn-steps-for-processing-a-manifest
//
//
import isPlainObject from "lodash.isplainobject";

// sub parsers
import start_url from "./start_url";
import display from "./display";
import orientation from "./orientation";
import name from "./name";
import lang from "./lang";
import short_name from "./short_name";
import array_of_images from "./array_of_images";
import scope from './scope';
import css_color from './css_color';

// utils
import consoleLogger from "./logger";

export default function manifestParser (opts) {
  const manifestStr = opts.manifest;

  let {manifestUrl, documentUrl, logger: _logger} = opts;

  if (typeof _logger === "undefined")
    _logger = consoleLogger;

  const logger = _logger("manifest-parser");

  if (typeof manifestUrl !== "string" || manifestUrl === "")
    return logger.error("Manifest URL is required");
  if (typeof documentUrl !== "string" || documentUrl === "")
    return logger.error("Document URL is required");

  // propagate error if failed parsing
  let manifest;
  try {
    manifest = JSON.parse(manifestStr);
  } catch(e) {
    return logger.error("JSON Parse Error");
  }

  // Step 3
  if (!isPlainObject(manifest)) return logger.error("The Manifest needs to be an object");
  // Step 3.2 is not necessary as we throw and break the execution here

  // result
  const processed = {};

  // Step 5
  // start_url
  processed.start_url = start_url({manifest, manifestUrl, documentUrl, logger: _logger});

  // step 6
  // display mode
  processed.display = display({manifest, logger: _logger});

  // step 7
  // orientation
  processed.orientation = orientation({manifest, display: processed.display, logger: _logger});

  // step 8
  // name
  processed.name = name({manifest, logger: _logger});

  // TODO
  // step 9
  // lang
  // processed.language = lang({manifest, })

  // step 10
  // short_name
  processed.short_name = short_name({manifest, logger: _logger});

  // step 11
  // icons - array of images
  processed.icons = array_of_images({manifest, manifestUrl, logger: _logger, key: "icons"});

  // step 12
  // splash_screens - array of images
  processed.splash_screens = array_of_images({manifest, manifestUrl, logger: _logger, key: "splash_screens"});

  // step 13
  processed.scope = scope({manifest, manifestUrl, documentUrl, start_url: processed.start_url, logger: _logger});

  // step 14
  // TODO
  // processed.related_applications = related_applications({manifest, logger: _logger});

  // step 15
  // TODO
  // processed.prefer_related_applications = prefer_related_applications({manifest, logger: _logger});

  // step 16
  processed.theme_color = css_color({manifest, logger: _logger, key: "theme_color"});

  // step 17
  processed.background_color = css_color({manifest, logger: _logger, key: "background_color"});

  // step 18
  // finally
  return processed;

}
