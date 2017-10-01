import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as BackendAPI from '../../utils/api'
import * as Actions from '../actions'
import Modal from 'react-modal'
import { withRouter } from 'react-router-dom'
import * as Constants from '../../constants'

class PostActions extends Component {

  state = {
    confirmModalOpen: false
  }

  upVote(postId) {
    BackendAPI.voteOnPost(postId,{option:"upVote"})
    this.props.dispatch(Actions.upVotePost(postId))
  }

  downVote(postId) {
    BackendAPI.voteOnPost(postId,{option:"downVote"})
    this.props.dispatch(Actions.downVotePost(postId))
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
    const { postId, postTitle } = this.props
    return (
      <div>
        <div>
          <button onClick={() => this.upVote(postId)}>Upvote</button>
          <button onClick={() => this.downVote(postId)}>Downvote</button>
          <button onClick={() => this.edit(postId)}>Edit</button>
          <button onClick={this.openConfirmModal}>Delete</button>
        </div>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={confirmModalOpen}
          onRequestClose={this.closeConfirmModal}
          contentLabel='Modal'>
          <div>Really delete "{postTitle}"?</div>
          <div>
            <button>Delete</button>
            <button onClick={this.closeConfirmModal}>Cancel</button>
          </div>
        </Modal>
      </div>
    )
  }
}

  export default withRouter(connect()(PostActions))
