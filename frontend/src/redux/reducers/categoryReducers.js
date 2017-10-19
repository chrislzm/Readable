/*
  Readable: reducers/categoryReducers.js
  By Chris Leung

  Description:

  Category-related reducers for the Readable app's Redux store.
*/

import {
  ADD_NEW_CATEGORY,
  SET_CURRENT_CATEGORY
} from '../actions/actionTypes'

import { DEFAULT_CATEGORY_NAME, DEFAULT_CATEGORY_PATH } from '../../utils/constants'

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
  name: DEFAULT_CATEGORY_NAME,
  path: DEFAULT_CATEGORY_PATH
}, action) {

    const { name, path } = action

    switch(action.type) {
      case SET_CURRENT_CATEGORY:
        return { name, path }
      default:
        return state
    }
}
