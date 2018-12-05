export const normalizeSizes = references => {
  let sizes = {};
  for (let key in references) {
    let size = { width: 0, height: 0 };
    if (references[key].current) {
      const { offsetWidth, offsetHeight } = references[key].current;
      size = { width: offsetWidth, height: offsetHeight };
    }
    sizes[key] = size;
  }
  return sizes;
};
