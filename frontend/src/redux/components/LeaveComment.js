import React, { Component } from 'react'
import Editor from './Editor'
import * as Constants from '../../utils/constants'
import Modal from 'react-modal'

class LeaveComment extends Component {

  state = {
    confirmModalOpen: false
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
    const { postId } = this.props
    return (
      <div>
        <h2>Leave a New Comment</h2>
        <Editor
          editingMode={Constants.EDITOR_ADD_COMMENT_MODE}
          handleEdit={this.openConfirmModal}
          postId={postId}/>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={confirmModalOpen}
          onRequestClose={this.closeConfirmModal}
          contentLabel='Modal'>
          <div>Comment has been added!</div>
          <div>
            <button onClick={this.closeConfirmModal}>OK</button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default LeaveComment;
