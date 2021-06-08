export function trimObject(object: Object): Object {
  Object.keys(object).forEach((key) => {
    object[key] = object[key].trim();
  });
  return object;
}

export function deleteEmptyObjectProperty(object: Object): Object {
  Object.keys(object).forEach((key) => {
    if (!object[key].trim()) {
      delete object[key];
    }
  });
  return object;
}
