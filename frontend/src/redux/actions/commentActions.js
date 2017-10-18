import {
  ADD_NEW_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  VOTE_ON_COMMENT,
} from './actionTypes'

import * as CommentAPI from '../../api/commentApi'
import * as Helpers from '../../utils/helpers'

/* Thunk Actions */

export const fetchAllComments = (parentId) => dispatch => (
  CommentAPI.getAllComments(parentId).then(comments => (
    comments.forEach(comment => {
      const {parentId,...content} = comment
      dispatch(addNewComment(parentId,content))
    })
  ))
)

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

export const saveEditedComment = (id,parentId,body,newTimeStamp) => dispatch => {
  const timestamp = newTimeStamp.format("x")
  const editedComment = {
    timestamp,
    body
  }
  CommentAPI.editComment(id,editedComment).then(() => dispatch(editComment(id,parentId,body,timestamp)))
}

export const submitNewComment = (body, author, parentId) => dispatch => {
  const newComment = {
    id: Helpers.guid(),
    timestamp: Date.now(),
    body,
    author,
    parentId
  }
  CommentAPI.addNewComment(newComment).then(() => dispatch(addNewComment(parentId,newComment)))
}

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
