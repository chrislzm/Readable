import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as BackendAPI from '../../utils/api'
import { upVotePost, downVotePost } from '../actions'
import Modal from 'react-modal'
import { withRouter } from 'react-router-dom'
import * as Constants from '../../utils/constants'

class Actions extends Component {

  state = {
    confirmModalOpen: false
  }

  upVote(postId) {
    BackendAPI.voteOnPost(postId,{option:"upVote"})
    this.props.dispatch(upVotePost(postId))
  }

  downVote(postId) {
    BackendAPI.voteOnPost(postId,{option:"downVote"})
    this.props.dispatch(downVotePost(postId))
  }

  edit(postId) {
    this.props.history.push(`/${Constants.EDIT_POST_PATH}/${postId}`)
  }

  delete(postId) {
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
    const { id, title, mode } = this.props
    return (
      <div>
        <div>
          <button onClick={() => this.upVote(id)}>Upvote</button>
          <button onClick={() => this.downVote(id)}>Downvote</button>
          <button onClick={() => this.edit(id)}>Edit</button>
          <button onClick={this.openConfirmModal}>Delete</button>
        </div>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={confirmModalOpen}
          onRequestClose={this.closeConfirmModal}
          contentLabel='Modal'>
          <div>Really delete "{title}"?</div>
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
