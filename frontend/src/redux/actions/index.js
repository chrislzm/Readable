export const ADD_NEW_POST = 'ADD_NEW_POST'
export const ADD_NEW_CATEGORY = 'ADD_NEW_CATEGORY'
export const UPVOTE_POST = 'UPVOTE_POST'

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

export function upVotePost(id) {
  return {
    type: UPVOTE_POST,
    id
  }
}
