import { combineReducers } from 'redux'

import {
  ADD_NEW_POST,
  ADD_NEW_CATEGORY,
  UPVOTE_POST,
  DOWNVOTE_POST,
  SET_CURRENT_CATEGORY_PATH
} from '../actions'

function categories(state = {}, action) {
  const { categoryPath, categoryName } = action

  switch(action.type) {
    case ADD_NEW_CATEGORY:
      return {
        ...state,
        [categoryPath]: categoryName
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

function currentCategory(state = {path: ''}, action) {
    const { path } = action

    switch(action.type) {
      case SET_CURRENT_CATEGORY_PATH:
        return {
          ...state,
          path
        }
      default:
        return state
    }
}

export default combineReducers({
  currentCategory,
  categories,
  posts
})
