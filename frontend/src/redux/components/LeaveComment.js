import React, { Component } from 'react'
import PostEditor from './PostEditor'

class LeaveComment extends Component {
  render() {
    const { postId } = this.props
    return (
      <div>
        <h2>Leave a Comment</h2>
        <PostEditor/>
      </div>
    )
  }
}

export default LeaveComment;
