import {
  ADD_NEW_POST,
  DELETE_POST,
  EDIT_POST,
  VOTE_ON_POST,
} from '../actions/actionTypes'

export default function posts(state = {}, action) {
  const { id } = action

  switch(action.type) {
    case ADD_NEW_POST:
      const {content} = action
      content.deleted = false
      return {
        ...state,
        [id]: content
      }
    case DELETE_POST:
      return {
        ...state,
        [id]: {...state[id],
          deleted:true
        }
      }
    case EDIT_POST:
      const {title, body} = action
      return {
        ...state,
        [id]: {...state[id],
          title,
          body
        }
      }
    case VOTE_ON_POST:
      const { delta } = action
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore:state[id].voteScore+delta
        }
      }
    default:
      return state
  }
}
