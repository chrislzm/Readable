import { combineReducers } from 'redux'
import * as Constants from '../../utils/constants'

import {
  ADD_NEW_POST,
  ADD_NEW_CATEGORY,
  ADD_NEW_COMMENT,
  EDIT_POST,
  VOTE_COMMENT,
  VOTE_ON_POST,
  SET_CURRENT_CATEGORY
} from '../actions'

function categories(state = {}, action) {
  const { categoryName, categoryPath } = action

  switch(action.type) {
    case ADD_NEW_CATEGORY:
      return {
        ...state,
        [categoryName]: categoryPath
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
    case VOTE_COMMENT:
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
  name: Constants.ALL_POSTS_CATEGORY_NAME,
  path: Constants.ALL_POSTS_CATEGORY_PATH
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
