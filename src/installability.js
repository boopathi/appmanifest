//
//
// Based on
// http://w3c.github.io/manifest/#installability-signals
//
//

import link_tag from "./link_tag";

// utils
import consoleLogger from "./logger";

export default function installability({indexHtml, logger}) {

  if (typeof logger === "undefined")
    logger = consoleLogger;

  link_tag({indexHtml, logger});
}
