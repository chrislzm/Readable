import React, { Component } from 'react'
import Editor from './Editor'
import * as Constants from '../../utils/constants'
import Modal from 'react-modal'

class LeaveComment extends Component {

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
        <h2>Leave a New Comment</h2>
        <Editor
          editingMode={Constants.EDITOR_ADD_COMMENT_MODE}
          handleEdit={this.openModal}
          postId={postId}/>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={modalOpen}
          onRequestClose={this.closeModal}
          contentLabel='Modal'>
          <div>Comment has been added!</div>
          <div>
            <button onClick={this.closeModal}>OK</button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default LeaveComment;
