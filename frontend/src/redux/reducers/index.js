import { combineReducers } from 'redux'

import {
  ADD_CATEGORY
} from '../actions'

function category(state = [], action) {
  const { name, categories } = action

  switch(action.type) {
    case ADD_CATEGORY:
      return [
        ...state,
        ...categories
      ]
    default:
      return state
  }
}

export default combineReducers({
  category,
})
