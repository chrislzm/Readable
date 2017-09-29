import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../style/ViewPost.css'

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
                <div className="divTableCell">Title:</div>
                <div className="divTableCell">{post.title}</div>
              </div>
              <div className="divTableRow">
                <div className="divTableCell">Category:</div>
                <div className="divTableCell">{post.category}</div>
              </div>
              <div className="divTableRow">
                <div className="divTableCell">Author:</div>
                <div className="divTableCell">{post.author}</div>
              </div>
              <div className="divTableRow">
                <div className="divTableCell">Date:</div>
                <div className="divTableCell">{post.timestamp}</div>
              </div>
              <div className="divTableRow">
                <div className="divTableCell">Votes:</div>
                <div className="divTableCell">{post.voteScore}</div>
              </div>
              <div className="divTableRow">
                <div className="divTableCell">Body:</div>
                <div className="divTableCell">{post.body}</div>
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
