import { combineReducers } from 'redux'

import {
  ADD_NEW_POST, ADD_NEW_CATEGORY
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
