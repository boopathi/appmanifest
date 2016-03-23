import {parse} from 'parse5';

function searchAst (element, match) {
  if (match(element))
    return element;

  if (Array.isArray(element.childNodes) && element.childNodes.length > 0) {
    let result = null;
    for (let i=0; result === null && i<element.childNodes.length; i++)
      result = searchAst(element.childNodes[i], match);
    return result;
  }

  return null;
}

export default function link_tag ({indexHtml, logger: _logger}) {

  const logger = _logger("installability > link_tag");

  const documentRoot = parse(indexHtml);

  let link = searchAst(documentRoot, function match(element) {
    if (element.nodeName !== "link") return false;

    const rel = element.attrs.filter(attr => attr.name === "rel");
    if (rel.length < 1) return false;
    if (rel[0].value !== "manifest") return false;

    const href = element.attrs.filter(attr => attr.name === "href");
    if (href.length < 1) return false;
    if (href[0].value.trim() === "") return false;

    return true;
  });

  if (link === null) {
    logger.error(`No Link tag with rel=manifest and href=<url> found`);
    return void 0;
  }

  return link;

}
