import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as BackendAPI from '../../utils/api'
import { upVotePost, downVotePost, upVoteComment, downVoteComment } from '../actions'
import Modal from 'react-modal'
import { withRouter } from 'react-router-dom'
import * as Constants from '../../utils/constants'

class Actions extends Component {

  state = {
    confirmModalOpen: false
  }

  upVote(postId,mode,commentId) {
    switch(mode) {
      case Constants.ACTIONS_COMMENT_MODE:
        BackendAPI.voteOnComment(commentId,{option:"upVote"})
        this.props.dispatch(upVoteComment(commentId,postId))
        break
      default:
      case Constants.ACTIONS_POST_MODE:
        BackendAPI.voteOnPost(postId,{option:"upVote"})
        this.props.dispatch(upVotePost(postId))
    }
  }

  downVote(postId,mode,commentId) {
    switch(mode) {
      case Constants.ACTIONS_COMMENT_MODE:
        BackendAPI.voteOnComment(commentId,{option:"downVote"})
        this.props.dispatch(downVoteComment(commentId,postId))
        break
      default:
      case Constants.ACTIONS_POST_MODE:
        BackendAPI.voteOnPost(postId,{option:"downVote"})
        this.props.dispatch(downVotePost(postId))
    }
  }

  edit(postId,mode,commentId) {
    switch(mode) {
      case Constants.ACTIONS_COMMENT_MODE:
        break
      default:
      case Constants.ACTIONS_POST_MODE:
        this.props.history.push(`/${Constants.EDIT_POST_PATH}/${postId}`)
    }
  }

  delete(postId,mode,commentId) {
  }

  openConfirmModal = () => {
    this.setState(() => ({
      confirmModalOpen: true
    }))
  }

  closeConfirmModal = () => {
    this.setState(() => ({
      confirmModalOpen: false
    }))
  }

  render() {
    const { confirmModalOpen } = this.state
    const { postId, commentId, title, mode } = this.props
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
          <button onClick={() => this.upVote(postId,mode,commentId)}>Upvote</button>
          <button onClick={() => this.downVote(postId,mode,commentId)}>Downvote</button>
          <button onClick={() => this.edit(postId,mode,commentId)}>Edit</button>
          <button onClick={this.openConfirmModal}>Delete</button>
        </div>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={confirmModalOpen}
          onRequestClose={this.closeConfirmModal}
          contentLabel='Modal'>
          <div>{modalMessage}</div>
          <div>
            <button>Delete</button>
            <button onClick={this.closeConfirmModal}>Cancel</button>
          </div>
        </Modal>
      </div>
    )
  }
}

  export default withRouter(connect()(Actions))
