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

export const removePost = (postId) => dispatch => {
  PostAPI.deletePost(postId).then(() => dispatch(deletePost(postId)))
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
