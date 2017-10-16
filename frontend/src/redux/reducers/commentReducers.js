import {
  ADD_NEW_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  VOTE_ON_COMMENT,
} from '../actions/actionTypes'
import * as Constants from '../../utils/constants'

export default function comments(state = {}, action) {
  // id is the comment id, parentId is the post id the comment belongs to
  const { id, parentId } = action

  switch(action.type) {
    case ADD_NEW_COMMENT:
      const {content} = action
      // Set defaults if they were not defined
      if(!content.voteScore) {
        content.voteScore = Constants.DEFAULT_VOTES
      }
      if (!content.deleted) {
        content.deleted = false
      }
      if (!content.parentDeleted) {
        content.parentDeleted = false
      }
      return {
        ...state,
        [parentId]: {
          ...state[parentId],
          [content.id]:content
        }
      }
    case DELETE_COMMENT:
      return {
        ...state,
        [parentId]: {
          ...state[parentId],
          [id]: {
            ...state[parentId][id],
            deleted:true
          }
        }
      }
    case EDIT_COMMENT:
      const { body, timestamp} = action
      return {
        ...state,
        [parentId]: {
          ...state[parentId],
          [id]: {
            ...state[parentId][id],
            body,
            timestamp
          }
        }
      }
    case VOTE_ON_COMMENT:
      const { delta } = action
      return {
        ...state,
        [parentId]: {
          ...state[parentId],
          [id]: {
            ...state[parentId][id],
            voteScore:state[parentId][id].voteScore+delta
          }
        }
      }
    default:
      return state
  }
}
