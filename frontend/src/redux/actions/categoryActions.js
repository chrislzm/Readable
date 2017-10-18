/*
  Readable: actions/categoryActions.js
  By Chris Leung

  Description:

  Contains all Redux category-related actions used in Readable.

  Thunk actions are used to execute API calls and then dispatch other actions
  only after the fetch requests have completed. Only Thunk actions interact
  with the API server in the Readable app.

  For a description of the structure of category objects, please refer to the
  [frontend README file](../../../../README.md).
*/

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
