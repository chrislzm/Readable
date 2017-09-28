import { combineReducers } from 'redux'

import {
  ADD_NEW_POST, SET_CATEGORIES
} from '../actions'

function categories(state = [], action) {
  const { categories } = action

  switch(action.type) {
    case SET_CATEGORIES:
      return categories
    default:
      return state
  }
}

function posts(state = {}, action) {
  const { id, content } = action

  switch(action.type) {
    case ADD_NEW_POST:
      return {
        ...state,
        [id]: content
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts
})
