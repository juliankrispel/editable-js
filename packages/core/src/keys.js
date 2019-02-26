// @flow

export default (object: Object): Array<string> => {
  const ar = []
  for (let key in object) {
    ar.push(key)
  }
  return ar
}
