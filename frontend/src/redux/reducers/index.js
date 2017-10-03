import { combineReducers } from 'redux'
import * as Constants from '../../utils/constants'

import {
  ADD_NEW_POST,
  ADD_NEW_CATEGORY,
  EDIT_POST,
  UPVOTE_POST,
  DOWNVOTE_POST,
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

function posts(state = {}, action) {
  const { id } = action

  switch(action.type) {
    case ADD_NEW_POST:
      const {content} = action
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
    case UPVOTE_POST:
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore:state[id].voteScore+1
        }
      }
    case DOWNVOTE_POST:
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore:state[id].voteScore-1
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
  currentCategory,
  categories,
  posts
})
