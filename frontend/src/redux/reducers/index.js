import { combineReducers } from 'redux'

import {
  ADD_CATEGORIES
} from '../actions'

function categories(state = [], action) {
  const { newCategories } = action

  console.log(newCategories)
  switch(action.type) {
    case ADD_CATEGORIES:
      return [
        ...state,
        ...newCategories
        ]
    default:
      return state
  }
}

export default combineReducers({
  categories,
})
