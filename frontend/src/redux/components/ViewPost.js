import React, { Component } from 'react'
import Moment from 'moment'
import { connect } from 'react-redux'
import '../../style/ViewPost.css'
import * as Constants from '../../constants'
import PostActions from './PostActions'

class ViewPost extends Component {
  render() {
    const postId = this.props.match.params.postId
    const post = this.props.posts[postId]
    return (
      <div className="VieWPost">
        { post && (
          <div className="divTable blueTable">
            <div className="divTableBody">
              <div className="divTableRow">
                <div className="divTableLabel">Category</div>
                <div className="divTableCell">{post.category}</div>
              </div>
              <div className="divTableRow">
                <div className="divTableLabel">Title</div>
                <div className="divTableCell">{post.title}</div>
              </div>
              <div className="divTableRow">
                <div className="divTableLabel">Author</div>
                <div className="divTableCell">{post.author}</div>
              </div>
              <div className="divTableRow">
                <div className="divTableLabel">Body</div>
                <div className="divTableCell">{post.body}</div>
              </div>
              <div className="divTableRow">
                <div className="divTableLabel">Date</div>
                <div className="divTableCell">{Moment(post.timestamp, "x").format(Constants.DEFAULT_DATE_FORMAT)}</div>
              </div>
              <div className="divTableRow">
                <div className="divTableLabel">Votes</div>
                <div className="divTableCell">{post.voteScore}</div>
              </div>
              <div className="divTableRow">
                <div className="divTableLabel">Actions</div>
                <div className="divTableCell">
                  <PostActions postId={postId}/>
                </div>
                </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts
})

export default connect(mapStateToProps)(ViewPost);
