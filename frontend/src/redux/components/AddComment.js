/*
  Readable: components/AddComment.js
  By Chris Leung

  Description:

  React component that allows the user to add a comment to a post. It utilizes
  the Editor.js component, which entirely handles the form display, input,
  input validation, and submission of form data to the local Redux store and
  backend API server.

  Contains one modal window that displays a confirmation message after the new
  comment has been successfully added.

  Props:
    postId: <String> Required. Contains the id of the parent post to which we
      are adding a comment.
*/


import React, { Component } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import * as Constants from '../../utils/constants'
import Editor from './Editor'

class AddComment extends Component {

  static propTypes = {
    postId: PropTypes.string.isRequired
  }

  state = {
    modalOpen: false
  }

  openModal = () => {
    this.setState({modalOpen: true})
  }

  closeModal = () => {
    this.setState({modalOpen: false})
  }

  render() {
    const { modalOpen } = this.state
    const { postId } = this.props
    return (
      <div>
        <h2>
          Leave a New Comment
        </h2>
        <Editor
          editingMode={Constants.EDITOR_MODE_ADD_COMMENT}
          handleEdit={this.openModal}
          postId={postId}/>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={modalOpen}
          onRequestClose={this.closeModal}
          contentLabel='Modal'>
          <div>
            Comment has been added!
          </div>
          <div>
            <button
              onClick={this.closeModal}>
              OK
            </button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default AddComment
