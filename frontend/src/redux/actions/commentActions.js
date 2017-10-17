import {
  ADD_NEW_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  VOTE_ON_COMMENT,
} from './actionTypes'

import * as CommentAPI from '../../api/commentApi'
import * as Helpers from '../../utils/helpers'

/* Thunk Actions */

export const fetchComment = (commentId) => dispatch => (
  CommentAPI.getComment(commentId).then(comment => {
      if(Object.keys(comment).length > 0) {
        const {parentId,...content} = comment
        dispatch(addNewComment(parentId,content))
      }
  })
)

export const removeComment = (commentId,postId) => dispatch => (
  CommentAPI.deleteComment(commentId).then(() => dispatch(deleteComment(commentId,postId)))
)

export const submitVoteForComment = (commentId,postId,delta) => dispatch => {
  const apiVoteOptionValue = Helpers.convertVoteDeltaToApiOption(delta)
  CommentAPI.voteOnComment(commentId,{option:apiVoteOptionValue}).then(() => dispatch(voteOnComment(commentId,postId,delta)))
}

/* Redux Actions */

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
