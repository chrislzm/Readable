import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as BackendAPI from '../../utils/api'
import * as Constants from '../../utils/constants'
import * as ReduxStoreActions from '../actions'

class Actions extends Component {

  state = {
    modalOpen: false
  }

  openModal = () => {
    this.setState({modalOpen: true})
  }

  closeModal = () => {
    this.setState({modalOpen: false})
  }

  vote(delta,mode,postId,commentId) {
    let optionText

    if(delta === 1) {
        optionText = "upVote"
    } else { // delta === -1
      optionText = "downVote"
    }

    switch(mode) {
      case Constants.ACTIONS_MODE_COMMENT:
        BackendAPI.voteOnComment(commentId,{option:optionText})
        this.props.dispatch(ReduxStoreActions.voteOnComment(commentId,postId,delta))
        break
      default:
      case Constants.ACTIONS_MODE_POST:
        BackendAPI.voteOnPost(postId,{option:optionText})
        this.props.dispatch(ReduxStoreActions.voteOnPost(postId,delta))
    }
  }

  edit(postId,mode,commentId) {
    switch(mode) {
      case Constants.ACTIONS_MODE_COMMENT:
        this.props.history.push(`/${Constants.PATH_EDIT}/${postId}/${commentId}`)
        break
      default:
      case Constants.ACTIONS_MODE_POST:
        this.props.history.push(`/${Constants.PATH_EDIT}/${postId}`)
    }
  }

  delete(postId,mode,commentId,deleteHandler) {
    switch(mode) {
      case Constants.ACTIONS_MODE_COMMENT:
        this.props.dispatch(ReduxStoreActions.deleteComment(commentId,postId))
        BackendAPI.deleteComment(commentId)
        break
      default:
      case Constants.ACTIONS_MODE_POST:
        this.props.dispatch(ReduxStoreActions.deletePost(postId))
        BackendAPI.deletePost(postId)
    }
  }

  render() {
    const { modalOpen } = this.state
    const { postId, commentId, title, mode, deleteHandler } = this.props
    let modalMessage
    switch(mode) {
      case Constants.ACTIONS_MODE_COMMENT:
        modalMessage = "Really delete this comment?"
        break
      default:
      case Constants.ACTIONS_MODE_POST:
        modalMessage = `Really delete "${title}"?`
        break
      }
    return (
      <div>
        <div>
          <button onClick={() => this.vote(1,mode, postId,commentId)}>Upvote</button>
          <button onClick={() => this.vote(-1,mode, postId,commentId)}>Downvote</button>
          <button onClick={() => this.edit(postId,mode,commentId)}>Edit</button>
          <button onClick={this.openModal}>Delete</button>
        </div>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={modalOpen}
          onRequestClose={this.closeModal}
          contentLabel='Modal'>
          <div>{modalMessage}</div>
          <div>
            <button onClick={() => this.delete(postId,mode,commentId,deleteHandler)}>Delete</button>
            <button onClick={this.closeModal}>Cancel</button>
          </div>
        </Modal>
      </div>
    )
  }
}

  export default withRouter(connect()(Actions))
