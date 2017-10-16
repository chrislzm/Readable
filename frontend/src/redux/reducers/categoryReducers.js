import {
  ADD_NEW_CATEGORY,
  SET_CURRENT_CATEGORY
} from '../actions/actionTypes'
import * as Constants from '../../utils/constants'

export function categories(state = {}, action) {
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

export function currentCategory(state = {
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
