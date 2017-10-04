export const ADD_NEW_POST = 'ADD_NEW_POST'
export const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT'
export const ADD_NEW_CATEGORY = 'ADD_NEW_CATEGORY'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const VOTE_ON_POST = 'VOTE_ON_POST'
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY'

export function addNewPost(id,content) {
  return {
    type: ADD_NEW_POST,
    id,
    content
  }
}

export function addNewCategory(categoryName, categoryPath) {
  return {
    type: ADD_NEW_CATEGORY,
    categoryName,
    categoryPath
  }
}

export function addNewComment(parentId, content) {
  return {
    type: ADD_NEW_COMMENT,
    parentId,
    content
  }
}

export function editPost(id,title,body) {
  return {
    type: EDIT_POST,
    id,
    title,
    body
  }
}

export function voteOnPost(id,delta) {
  return {
    type: VOTE_ON_POST,
    id,
    delta
  }
}

export function voteOnComment(commentId,parentId,delta) {
  return {
    type: VOTE_COMMENT,
    commentId,
    parentId,
    delta
  }
}

export function setCurrentCategory(name, path) {
  return {
    type: SET_CURRENT_CATEGORY,
    name,
    path
  }
}
