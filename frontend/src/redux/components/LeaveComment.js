import React, { Component } from 'react'
import Editor from './Editor'

class LeaveComment extends Component {
  render() {
    const { postId } = this.props
    return (
      <div>
        <h2>Leave a New Comment</h2>
        <Editor/>
      </div>
    )
  }
}

export default LeaveComment;
