/*
  Readable: actions/index.js
  By Chris Leung

  Description:

  Contains all Redux Store actions and action type constants used in Readable.
  Actions and parameters are self-explanatory, with exception of post and
  comment content. For a description of the structure of these two objects,
  please see README.md

*/

import {
  ADD_NEW_POST,
  DELETE_POST,
  EDIT_POST,
  VOTE_ON_POST,
} from './actionTypes'

import * as Helpers from '../../utils/helpers'
import * as PostAPI from '../../api/postApi'

/* Thunk Actions */

export const fetchPost = (postId) => dispatch => (
  PostAPI.getPost(postId).then(post => {
    // Verify this is an existing post--if it is, it will have data
    if(Object.keys(post).length > 0) {
      dispatch(addNewPost(post))
    }
  })
)

export const removePost = (postId) => dispatch => (
  PostAPI.deletePost(postId).then(() => dispatch(deletePost(postId)))
)

export const saveEditedPost = (id,title,body) => dispatch => {
  const editedPost = {
    title,
    body
  }
  PostAPI.editPost(id,editedPost).then(() => dispatch(editPost(id,title,body)))
}

export const submitVoteForPost = (id,delta) => dispatch => {
  const apiVoteOptionValue = Helpers.convertVoteDeltaToApiOption(delta)
  PostAPI.voteOnPost(id,{option:apiVoteOptionValue}).then(() => dispatch(voteOnPost(id,delta)))
}

/* Redux Actions */

export function addNewPost(post) {
  const {id,...content} = post
  return {
    type: ADD_NEW_POST,
    id,
    content
  }
}

export function deletePost(id) {
  return {
    type: DELETE_POST,
    id
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
