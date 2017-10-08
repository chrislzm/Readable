import React, { Component } from 'react'
import Modal from 'react-modal'
import * as Constants from '../../utils/constants'
import Editor from './Editor'

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
          editingMode={Constants.EDITOR_MODE_ADD_COMMENT}
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
