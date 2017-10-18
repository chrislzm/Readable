import {
  ADD_NEW_CATEGORY,
  SET_CURRENT_CATEGORY
} from './actionTypes'

import * as CategoryAPI from '../../api/categoryApi'

/* Thunk Actions */

export const fetchCategories = () => dispatch => (
  CategoryAPI.getCategories().then(categories => (
    categories.forEach(category => {
      const {name, path} = category
      dispatch(addNewCategory(name,path))
    })
  ))
)

/* Redux Actions */

export function addNewCategory(name, path) {
  return {
    type: ADD_NEW_CATEGORY,
    name,
    path
  }
}

export function setCurrentCategory(name, path) {
  return {
    type: SET_CURRENT_CATEGORY,
    name,
    path
  }
}
