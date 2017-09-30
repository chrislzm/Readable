export const ADD_NEW_POST = 'ADD_NEW_POST'
export const ADD_NEW_CATEGORY = 'ADD_NEW_CATEGORY'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const SET_CURRENT_CATEGORY_PATH = 'SET_CURRENT_CATEGORY_PATH'

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

export function downVotePost(id) {
  return {
    type: DOWNVOTE_POST,
    id
  }
}
export function upVotePost(id) {
  return {
    type: UPVOTE_POST,
    id
  }
}

export function setCurrentCategoryPath(path) {
  return {
    type: SET_CURRENT_CATEGORY_PATH,
    path
  }
}
