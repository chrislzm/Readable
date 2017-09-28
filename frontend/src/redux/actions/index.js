export const ADD_NEW_POST = 'ADD_NEW_POST'
export const ADD_NEW_CATEGORY = 'ADD_NEW_CATEGORY'

export function addNewPost(id,content) {
  return {
    type: ADD_NEW_POST,
    id,
    content
  }
}

export function addNewCategory(categoryPath,categoryName) {
  return {
    type: ADD_NEW_CATEGORY,
    categoryPath,
    categoryName
  }
}
