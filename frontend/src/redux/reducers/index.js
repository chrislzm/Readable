import { combineReducers } from 'redux'

import {
  SET_CATEGORIES
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

export default combineReducers({
  categories,
})
