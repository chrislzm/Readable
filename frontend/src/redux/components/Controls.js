/*
  Readable: components/Controls.js
  By Chris Leung

  Description:

  React component that displays a group of controls for posts or comments. The
  controls are "Upvote", "Downvote", "Edit", and "Delete".

  Also contains one modal window that displays a delete confirmation message and
  two buttons to confirm or cancel the delete operation.

  This component is used by the ListComments, ListPosts, and ViewPost
  components.

  Props:
    mode: <String Constant> Value must be CONTENT_MODE_COMMENT if being used
      with a comment, or CONTENT_MODE_POST if being used with a post.
    postId: <String>  Required. Contains the id of the parent post when we are
      in comment mode.
    commentId: <String> Required in comment mode only.
    title: <String> Required in post mode only. Contains the post title.
*/

import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as Constants from '../../utils/constants'
import * as CommentActions from '../actions/commentActions'
import * as PostActions from '../actions/postActions'

class Controls extends Component {

  static propTypes = {
    mode: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    commentId: PropTypes.string,
    title: PropTypes.string
  }

  state = {
    modalOpen: false,
    modalMessage: ''
  }

  openModal = () => {
    this.setState({modalOpen: true})
  }

  closeModal = () => {
    this.setState({modalOpen: false})
  }

  componentDidMount() {
    const { mode, title } = this.props

    switch(mode) {
      case Constants.CONTENT_MODE_COMMENT:
        this.setState({ modalMessage: 'Really delete this comment?' })
        break
      default:
      case Constants.CONTENT_MODE_POST:
        this.setState({ modalMessage: `Really delete "${title}"?`})
        break
    }
  }

  /*
    Method: vote
    Description: Handles a click on the "Upvote" or "Downvote" buttons.
    Parameters:
      delta: <Integer> Either 1 or -1, representing upvote and downvote
      mode: Same as mode prop (see above)
      postId: Same as postId prop (see above)
      commentId: Same as commentId prop (see above)
  */
  vote(delta,mode,postId,commentId) {
    switch(mode) {
      case Constants.CONTENT_MODE_COMMENT:
        this.props.dispatch(CommentActions.submitVoteForComment(commentId,postId,delta))
        break
      default:
      case Constants.CONTENT_MODE_POST:
        this.props.dispatch(PostActions.submitVoteForPost(postId,delta))
    }
  }

  /*
    Method: edit
    Description: Handles a click on the "Edit"" button by routing the user's
      browser to the edit page for that comment/post.
    Parameters:
      postId: Same as postId prop (see above)
      mode: Same as mode prop (see above)
      commentId: Same as commentId prop (see above)
  */
  edit(postId,mode,commentId) {
    switch(mode) {
      case Constants.CONTENT_MODE_COMMENT:
        this.props.history.push(`/${Constants.PATH_EDIT}/${postId}/${commentId}`)
        break
      default:
      case Constants.CONTENT_MODE_POST:
        this.props.history.push(`/${Constants.PATH_EDIT}/${postId}`)
    }
  }

  /*
    Method: delete
    Description: Handles a click on the "Delete"" button, deleting the selected
      post or comment. Note that this component's modal is displayed prior to
      this that first allows the user to confirm or cancel the delete.
    Parameters:
      postId: Same as postId prop (see above)
      mode: Same as mode prop (see above)
      commentId: Same commentId as prop (see above)
  */
  delete(postId,mode,commentId) {
    switch(mode) {
      case Constants.CONTENT_MODE_COMMENT:
        this.props.dispatch(CommentActions.removeComment(commentId,postId))
        break
      default:
      case Constants.CONTENT_MODE_POST:
        this.props.dispatch(PostActions.removePost(postId))
    }
  }

  render() {
    const { modalOpen, modalMessage } = this.state
    const { postId, commentId, mode } = this.props
    return (
      <div>
        <div>
          <button
            onClick={() => this.vote(1,mode, postId,commentId)}>
            Upvote
          </button>
          <button
            onClick={() => this.vote(-1,mode, postId,commentId)}>
            Downvote
          </button>
          <button
            onClick={() => this.edit(postId,mode,commentId)}>
            Edit
          </button>
          <button
            onClick={this.openModal}>
            Delete
          </button>
        </div>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={modalOpen}
          onRequestClose={this.closeModal}
          contentLabel='Modal'>
          <div>{modalMessage}</div>
          <div>
            <button
              onClick={() => this.delete(postId,mode,commentId)}>
              Delete
            </button>
            <button
              onClick={this.closeModal}>
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default withRouter(connect()(Controls))
