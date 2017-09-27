import * as Constants from '../constants'

export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

export function getCurrentCategoryPathAndName(urlPath,reduxStoreCategories) {

      let categoryPath, categoryName

      // If a path to a category wasn't defined, or we haven't loaded categories from the server yet
      if(!urlPath || reduxStoreCategories.length === 0) {
        // Assign default category and path
        categoryPath = Constants.DEFAULT_CATEGORY_PATH
        categoryName = Constants.DEFAULT_CATEGORY_NAME
      } else {
        // Otherwise look up the category name based on the path
        categoryName = reduxStoreCategories.find(category => category.path === urlPath).name
        // Add forward slash to path for proper linking
        categoryPath = '/' + urlPath
      }
      return {categoryPath,categoryName}
}
