/*
  Readable: components/ListComments.js
  By Chris Leung

  Description:

  React component that outputs all comments for a given post. Passes the content
  of each comment to Viewer.js, which entirely handles the display of each
  comment to the user along with the controls to upvote, downvote, edit and
  delete the comment.

  Props:
    parentId: <String> Required. Contains the id of the parent post whose
      comments we are listing.
    Redux Store State: Mapped to props
*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as BackendAPI from '../../utils/api'
import * as Constants from '../../utils/constants'
import * as Helpers from '../../utils/helpers'
import * as ReduxStoreActions from '../actions'
import Viewer from './Viewer'

class ListComments extends Component {

  componentDidMount() {
    const {parentId} = this.props
    BackendAPI.getAllComments(parentId).then(comments => {
      for(const comment of comments) {
        const {parentId,...content} = comment
        this.props.dispatch(ReduxStoreActions.addNewComment(parentId,content))
      }
    })
  }

  render() {
    const {parentId} = this.props

    let commentsArray, commentsToOutput, numComments = 0

    const allPostComments = this.props.comments[parentId]
    if(allPostComments) {
      // If comments exists for this post, convert the comment objects into an
      // array for ease of output
      commentsArray = Object.keys(allPostComments).reduce((accumulator, commentId) => {
        let comment = allPostComments[commentId]
        comment.parentId = parentId
        accumulator.push(comment)
        return accumulator
      },[])
      // Filter out deleted comments
      commentsToOutput = commentsArray.filter(comment => !comment.deleted).sort(Helpers.sortByVotesDescending)
      numComments = commentsToOutput.length
    }
    return (
      <div>
        <h2>Comments ({numComments})</h2>
        { numComments === 0 && (
            <div className="StatusMessage">This post has no comments yet</div>
          )}
        { numComments > 0 && commentsToOutput.map(comment => (
          <Viewer
            content={comment}
            key={comment.id}
            mode={Constants.ACTIONS_MODE_COMMENT}/>
          ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  comments: state.comments
})


export default connect(mapStateToProps)(ListComments);
