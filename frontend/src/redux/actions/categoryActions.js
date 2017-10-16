import {
  ADD_NEW_CATEGORY,
  SET_CURRENT_CATEGORY
} from './actionTypes'

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
