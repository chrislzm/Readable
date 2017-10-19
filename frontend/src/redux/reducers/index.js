/*
  Readable: reducers/index.js
  By Chris Leung

  Description:

  Root reducer for the Readable app's Redux store.
*/

import { combineReducers } from 'redux'
import { categories, currentCategory } from './categoryReducers'
import comments from './commentReducers.js'
import posts from './postReducers.js'

export default combineReducers({
  categories,
  comments,
  currentCategory,
  posts
})
