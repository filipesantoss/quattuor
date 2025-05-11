export function assert(predicate: boolean): asserts predicate {
  if (!predicate) {
    throw Error();
  }
}
