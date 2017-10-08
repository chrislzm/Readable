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
      filteredComments = comments.filter(comment => !comment.deleted).sort(Helpers.sortByVotesDescending)
      numComments = filteredComments.length
    }
    return (
      <div>
        <h2>Comments ({numComments})</h2>
        { numComments > 0 && filteredComments.map(comment => (
          <Viewer
            content={comment}
            key={comment.id}
            mode={Constants.ACTIONS_MODE_COMMENT}/>
          ))}
        { numComments === 0 && (
            <div className="StatusMessage">This post has no comments yet</div>
          )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  comments: state.comments
})


export default connect(mapStateToProps)(ListComments);
