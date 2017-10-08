/*
  Readable: actions/index.js
  By Chris Leung

  Description:
  Contains all Redux Store actions and action type constants used in Readable.
  Actions and parameters are self-explanatory, with exception of post and
  comment content. For a description of the structure of these two objects,
  please see README.md
*/

export const ADD_NEW_POST = 'ADD_NEW_POST'
export const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT'
export const ADD_NEW_CATEGORY = 'ADD_NEW_CATEGORY'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT'
export const VOTE_ON_POST = 'VOTE_ON_POST'
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY'

export function addNewPost(post) {
  const {id,...content} = post
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

export function deletePost(id) {
  return {
    type: DELETE_POST,
    id
  }
}

export function deleteComment(commentId,parentId) {
  return {
    type: DELETE_COMMENT,
    commentId,
    parentId
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

export function editComment(id,parentId,body,timestamp) {
  return {
    type: EDIT_COMMENT,
    id,
    parentId,
    body,
    timestamp
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
    type: VOTE_ON_COMMENT,
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
