import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as BackendAPI from '../../utils/api'
import * as Actions from '../actions'

class PostActions extends Component {

  upVote(postId) {
    BackendAPI.voteOnPost(postId,{option:"upVote"})
    this.props.dispatch(Actions.upVotePost(postId))
  }

  downVote(postId) {
    BackendAPI.voteOnPost(postId,{option:"downVote"})
    this.props.dispatch(Actions.downVotePost(postId))
  }

  edit(postId) {
    alert("Editing")
  }

  delete(postId) {
    alert("Deleting")
  }

  render() {
    const { postId } = this.props
    return (
      <div>
        <button onClick={() => this.upVote(postId)}>Upvote</button>
        <button onClick={() => this.downVote(postId)}>Downvote</button>
        <button onClick={() => this.edit(postId)}>Edit</button>
        <button onClick={() => this.delete(postId)}>Delete</button>
      </div>
    )
  }
}

export default connect()(PostActions);
