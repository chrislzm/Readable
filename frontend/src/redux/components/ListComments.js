import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addNewComment } from '../actions'
import * as BackendAPI from '../../utils/api'
import Viewer from './Viewer'
import * as Constants from '../../utils/constants'

class ListComments extends Component {

  componentDidMount() {
    const {parentId} = this.props
    BackendAPI.getAllComments(parentId).then(comments => {
      for(const comment of comments) {
        const {parentId,...content} = comment
        this.props.dispatch(addNewComment(parentId,content))
      }
    })
  }

  sortDateDescending(a,b) {
    if(a.timestamp < b.timestamp) return 1
    if(a.timestamp === b.timestamp) return 0
    if(a.timestamp > b.timestamp) return -1
  }

  render() {
    const {parentId} = this.props
    const commentGroup = this.props.comments[parentId]
    let comments, filteredComments
    let numComments = 0
    if(commentGroup) {
      comments = Object.keys(commentGroup).reduce((accumulator, commentId) => {
        let comment = commentGroup[commentId]
        comment.parentId = parentId
        accumulator.push(comment)
        return accumulator
      },[])
      filteredComments = comments.filter(comment => !comment.deleted).sort(this.sortDateDescending)
      numComments = filteredComments.length
    }
    return (
      <div>
        <h2>Comments ({numComments})</h2>
        { numComments > 0 && filteredComments.map(comment => (
          <Viewer
            content={comment}
            key={comment.id}
            mode={Constants.ACTIONS_COMMENT_MODE}/>
          ))}
        { numComments === 0 && (
            <div>This post has no comments.</div>
          )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  comments: state.comments
})


export default connect(mapStateToProps)(ListComments);
