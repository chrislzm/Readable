/*
  Readable: reducers/index.js
  By Chris Leung

  Description:

  Contains all Redux Store reducers used in Readable. Important notes:

    1) Function variables used in switch statements behave strangely (e.g.
    variables declared outside the switch statement are (for some strange
    reason) sometimes not available inside the switch statement), so below
    you will often see similar variables declared within switch case statements
    but with different naming styles as not to conflict with each other. (The
    compiler will complain if they share the same name). I do this to remove
    ambiguity that these variables are used elsewhere for other purposes.

    2) Note that the currentCategory default state is set to the
    DEFAULT_CATEGORY_NAME and DEFAULT_CATEGORY_PATH constants in
    utils/constants.js
*/

import { combineReducers } from 'redux'
import * as Constants from '../../utils/constants'

import {
  ADD_NEW_POST,
  ADD_NEW_CATEGORY,
  ADD_NEW_COMMENT,
  DELETE_COMMENT,
  DELETE_POST,
  EDIT_COMMENT,
  EDIT_POST,
  VOTE_ON_COMMENT,
  VOTE_ON_POST,
  SET_CURRENT_CATEGORY
} from '../actions'

function categories(state = {}, action) {
  const { name, path } = action

  switch(action.type) {
    case ADD_NEW_CATEGORY:
      return {
        ...state,
        [name]: path
      }
    default:
      return state
  }
}

function comments(state = {}, action) {
  const { parentId } = action

  switch(action.type) {
    case ADD_NEW_COMMENT:
      const {content} = action
      // Set defaults if they were not defined
      if(!content.voteScore) {
        content.voteScore = Constants.DEFAULT_VOTES
      }
      if (!content.deleted) {
        content.deleted = false
      }
      if (!content.parentDeleted) {
        content.parentDeleted = false
      }
      return {
        ...state,
        [parentId]: {
          ...state[parentId],
          [content.id]:content
        }
      }
    case DELETE_COMMENT:
      const cid = action.commentId
      return {
        ...state,
        [parentId]: {
          ...state[parentId],
          [cid]: {
            ...state[parentId][cid],
            deleted:true
          }
        }
      }
    case EDIT_COMMENT:
      const {id, body, timestamp} = action
      return {
        ...state,
        [parentId]: {
          ...state[parentId],
          [id]: {
            ...state[parentId][id],
            body,
            timestamp
          }
        }
      }
    case VOTE_ON_COMMENT:
      const { commentId, delta } = action
      return {
        ...state,
        [parentId]: {
          ...state[parentId],
          [commentId]: {
            ...state[parentId][commentId],
            voteScore:state[parentId][commentId].voteScore+delta
          }
        }
      }
    default:
      return state
  }
}

function posts(state = {}, action) {
  const { id } = action

  switch(action.type) {
    case ADD_NEW_POST:
      const {content} = action
      content.deleted = false
      return {
        ...state,
        [id]: content
      }
    case DELETE_POST:
      return {
        ...state,
        [id]: {...state[id],
          deleted:true
        }
      }
    case EDIT_POST:
      const {title, body} = action
      return {
        ...state,
        [id]: {...state[id],
          title,
          body
        }
      }
    case VOTE_ON_POST:
      const { delta } = action
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore:state[id].voteScore+delta
        }
      }
    default:
      return state
  }
}

function currentCategory(state = {
  name: Constants.DEFAULT_CATEGORY_NAME,
  path: Constants.DEFAULT_CATEGORY_PATH
}, action) {

    const { name, path } = action

    switch(action.type) {
      case SET_CURRENT_CATEGORY:
        return { name, path }
      default:
        return state
    }
}

export default combineReducers({
  categories,
  comments,
  currentCategory,
  posts
})
