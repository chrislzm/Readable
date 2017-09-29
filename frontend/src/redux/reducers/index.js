import { combineReducers } from 'redux'

import {
  ADD_NEW_POST, ADD_NEW_CATEGORY, UPVOTE_POST
} from '../actions'

function categories(state = {}, action) {
  const { categoryPath, categoryName } = action

  switch(action.type) {
    case ADD_NEW_CATEGORY:
      return {
        ...state,
        [categoryPath]: categoryName
      }
    default:
      return state
  }
}

function posts(state = {}, action) {
  const { id } = action

  switch(action.type) {
    case ADD_NEW_POST:
      const {content} = action
      return {
        ...state,
        [id]: content
      }
    case UPVOTE_POST:
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore:state[id].voteScore+1
        }
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts
})
