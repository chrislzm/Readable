import {
  ADD_NEW_CATEGORY,
  SET_CURRENT_CATEGORY
} from './actionTypes'

import * as BackendAPI from '../../utils/api'

export function addNewCategory(name, path) {
  return {
    type: ADD_NEW_CATEGORY,
    name,
    path
  }
}

export const fetchCategories = () => dispatch => (
  BackendAPI.getCategories().then(categories => {
    for(const category of categories) {
      const {name, path} = category
      dispatch(addNewCategory(name,path))
    }
  })
)

export function setCurrentCategory(name, path) {
  return {
    type: SET_CURRENT_CATEGORY,
    name,
    path
  }
}
