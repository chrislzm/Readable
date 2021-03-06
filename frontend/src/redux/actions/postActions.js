/*
  Readable: actions/postActions.js
  By Chris Leung

  Description:

  Contains all Redux category-related actions used in Readable.

  Thunk actions are used to execute API calls and then dispatch other actions
  only after the fetch requests have completed. Only Thunk actions interact
  with the API server in the Readable app.

  For a description of the structure of post objects, please refer to the
  [frontend README file](../../../../README.md).
*/

import {
  ADD_NEW_POST,
  DELETE_POST,
  EDIT_POST,
  VOTE_ON_POST,
} from './actionTypes'

import {
  DEFAULT_VOTES,
  DEFAULT_DELETED_FLAG
} from '../../utils/constants'

import * as CommentActions from './commentActions'
import * as Helpers from '../../utils/helpers'
import * as PostAPI from '../../api/postApi'

/* Thunk Actions */

export const fetchAllPostsAndComments = () => dispatch => (
  PostAPI.getAllPosts().then(posts => (
    posts.forEach(post => {
      dispatch(addNewPost(post))
      dispatch(CommentActions.fetchAllComments(post.id))
    })
  ))
)

export const fetchCategoryPostsAndComments = (categoryName) => dispatch => (
  PostAPI.getCategoryPosts(categoryName).then(posts => (
    posts.forEach(post => {
      dispatch(addNewPost(post))
      dispatch(CommentActions.fetchAllComments(post.id))
    })
  ))
)

export const fetchPost = (postId) => dispatch => (
  PostAPI.getPost(postId).then(post => {
    // Verify this is a valid post
    if(Object.keys(post).length > 0 && !post.error) {
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

export const submitNewPost = (post) => dispatch => {
  post.id = Helpers.guid()
  post.timestamp = Date.now()
  post.voteScore = DEFAULT_VOTES
  post.deleted = DEFAULT_DELETED_FLAG
  PostAPI.addNewPost(post).then(() => dispatch(addNewPost(post)))
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
