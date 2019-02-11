// @flow

export default (left: Object, right: Object): boolean =>
  Object.keys(right).every((key) => left[key] === right[key])
