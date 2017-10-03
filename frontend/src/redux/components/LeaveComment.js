import React, { Component } from 'react'
import Editor from './Editor'
import * as Constants from '../../utils/constants'

class LeaveComment extends Component {
  render() {
    const { postId } = this.props
    return (
      <div>
        <h2>Leave a New Comment</h2>
        <Editor editingMode={Constants.EDITOR_ADD_COMMENT_MODE} postId={postId}/>
      </div>
    )
  }
}

export default LeaveComment;
