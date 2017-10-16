import {
  ADD_NEW_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  VOTE_ON_COMMENT,
} from './actionTypes'

export function addNewComment(parentId, content) {
  return {
    type: ADD_NEW_COMMENT,
    parentId,
    content
  }
}

export function deleteComment(id,parentId) {
  return {
    type: DELETE_COMMENT,
    id,
    parentId
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
export function voteOnComment(id,parentId,delta) {
  return {
    type: VOTE_ON_COMMENT,
    id,
    parentId,
    delta
  }
}
