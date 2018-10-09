const data = {}

const set = (key, val) => {
  if (val) {
    data[key] = val;
  }
}

const get = (key) => {
  return data[key];
}

export default global = {
  data: data,
  set: set,
  get: get,
}
