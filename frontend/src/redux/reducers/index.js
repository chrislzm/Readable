/*
  Readable: reducers/index.js
  By Chris Leung

  Description:

  Contains all Redux Store reducers used in Readable. Note that the
  currentCategory default state is set to the DEFAULT_CATEGORY_NAME and
  DEFAULT_CATEGORY_PATH string constant values in utils/constants.js.

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
