import React, { Component } from 'react'
import * as BackendAPI from '../../utils/api'

class ListComments extends Component {
  render() {
    const { postId } = this.props
    return (
      <div>
        <h2>Comments for Post ID "{postId}"</h2>
      </div>
    )
  }
}

export default ListComments;
