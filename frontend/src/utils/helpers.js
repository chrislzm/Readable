export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

export function convertCategoriesToArray(categories) {
  const categoryArray = Object.keys(categories).map(key => (
    {path:key,name:categories[key]}
  ))
  return categoryArray
}

// https://stackoverflow.com/a/105074/7602403
export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
