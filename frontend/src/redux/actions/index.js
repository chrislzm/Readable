export const ADD_NEW_POST = 'ADD_NEW_POST'
export const SET_CATEGORIES = 'SET_CATEGORIES'

export function addNewPost(id,content) {
  return {
    type: ADD_NEW_POST,
    id,
    content
  }
}

export function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories
  }
}
