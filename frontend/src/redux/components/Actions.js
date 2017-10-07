import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as BackendAPI from '../../utils/api'
import { deleteComment, deletePost, voteOnPost, voteOnComment } from '../actions'
import Modal from 'react-modal'
import { withRouter } from 'react-router-dom'
import * as Constants from '../../utils/constants'

class Actions extends Component {

  state = {
    modalOpen: false
  }

  vote(delta,mode,postId,commentId) {
    let optionText

    if(delta === 1) {
        optionText = "upVote"
    } else { // delta === -1
      optionText = "downVote"
    }

    switch(mode) {
      case Constants.ACTIONS_COMMENT_MODE:
        BackendAPI.voteOnComment(commentId,{option:optionText})
        this.props.dispatch(voteOnComment(commentId,postId,delta))
        break
      default:
      case Constants.ACTIONS_POST_MODE:
        BackendAPI.voteOnPost(postId,{option:optionText})
        this.props.dispatch(voteOnPost(postId,delta))
    }
  }

  edit(postId,mode,commentId) {
    switch(mode) {
      case Constants.ACTIONS_COMMENT_MODE:
        this.props.history.push(`/${Constants.EDIT_PATH}/${postId}/${commentId}`)
        break
      default:
      case Constants.ACTIONS_POST_MODE:
        this.props.history.push(`/${Constants.EDIT_PATH}/${postId}`)
    }
  }

  delete(postId,mode,commentId,deleteHandler) {
    switch(mode) {
      case Constants.ACTIONS_COMMENT_MODE:
        this.props.dispatch(deleteComment(commentId,postId))
        BackendAPI.deleteComment(commentId)
        break
      default:
      case Constants.ACTIONS_POST_MODE:
        this.props.dispatch(deletePost(postId))
        BackendAPI.deletePost(postId)
    }
  }

  openModal = () => {
    this.setState(() => ({
      modalOpen: true
    }))
  }

  closeModal = () => {
    this.setState(() => ({
      modalOpen: false
    }))
  }

  render() {
    const { modalOpen } = this.state
    const { postId, commentId, title, mode, deleteHandler } = this.props
    let modalMessage
    switch(mode) {
      case Constants.ACTIONS_COMMENT_MODE:
        modalMessage = "Really delete this comment?"
        break
      default:
      case Constants.ACTIONS_POST_MODE:
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
