export default function same_origin (A, B) {
  // TODO:
  // spec - https://html.spec.whatwg.org/#same-origin
  // for now, lets check origin
  return A.origin === B.origin;
}
