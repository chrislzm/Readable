import * as Constants from '../constants'

export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

export function convertCategoriesToArray(categories) {
  const categoryArray = Object.keys(categories).map(key => (
    {path:key,name:categories[key]}
  ))
  return {categories:categoryArray}
}

export function getCurrentCategoryPathAndName(urlPath,reduxStoreCategories) {

      let categoryPath, categoryName

      // If a path to a category wasn't defined or we haven't completely loaded categories from the server yet
      if(!urlPath || Object.keys(reduxStoreCategories).length === 0 || !reduxStoreCategories[urlPath]) {
        // Assign default category and path
        categoryPath = Constants.DEFAULT_CATEGORY_PATH
        categoryName = Constants.DEFAULT_CATEGORY_NAME
      } else {
        // Otherwise look up the category name based on the path
        categoryName = reduxStoreCategories[urlPath]
        // Add forward slash to path for proper linking
        categoryPath = '/' + urlPath
      }

      return {categoryPath,categoryName}
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
