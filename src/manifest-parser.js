// JS only Implementation
import isPlainObject from "lodash.isplainobject";

// sub parsers
import start_url from "./start_url";
import * as consoleLogger from './logger';

// Parsing algorithm:
// http://w3c.github.io/manifest/#dfn-steps-for-processing-a-manifest
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

  // Step 5
  // start_url
  let startUrlProcessed = start_url({manifest, manifestUrl, documentUrl, logger});

  return startUrlProcessed;

}
