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

// utils
import consoleLogger from "./logger";

export default function parser (opts) {
  let manifestStr = opts.manifest;

  let {manifestUrl, documentUrl, logger} = opts;
  if (typeof manifestUrl !== "string" || manifestUrl === "")
    throw new TypeError("Manifest URL is required");
  if (typeof documentUrl !== "string" || documentUrl === "")
    throw new TypeError("Document URL is required");
  if (typeof logger === "undefined")
    logger = consoleLogger;

  // propagate error if failed parsing
  let manifest = JSON.parse(manifestStr);

  // Step 3
  if (!isPlainObject(manifest)) throw new TypeError("The Manifest needs to be an object");
  // Step 3.2 is not necessary as we throw and break the execution here

  // result
  let processed = {};

  // Step 5
  // start_url
  processed.start_url = start_url({manifest, manifestUrl, documentUrl, logger});

  // step 6
  // display mode
  processed.display = display({manifest, logger});

  // step 7
  // orientation
  processed.orientation = orientation({manifest, display: processed.display, logger});

  // step 8
  // name
  processed.name = name({manifest, logger});

  // step 9
  // short_name
  // processed.language = lang({manifest, })

  return processed;

}
