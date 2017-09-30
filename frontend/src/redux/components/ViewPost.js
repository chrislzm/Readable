import React, { Component } from 'react'
import Moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../style/ViewPost.css'
import * as Constants from '../../constants'
import PostActions from './PostActions'
import { capitalize } from '../../utils/helpers'

class ViewPost extends Component {
  render() {
    const { categoryPath, categoryName }  = this.props.currentCategory
    const postId = this.props.match.params.postId
    const post = this.props.posts[postId]
    return (
      <div>
        { post && (
          <div className="VieWPost">
            <div className="ViewPostsHeader">
              <h2>"{ post.title }"</h2>
              <div className="BackToCategory">
                <button>
                  <Link to={ `/${categoryPath}`}>&lt; Back To {capitalize(categoryName)}</Link>
                </button>
              </div>
            </div>
            <div className="divTable blueTable">
              <div className="divTableBody">
                <div className="divTableRow">
                  <div className="divTableLabel">Category</div>
                  <div className="divTableCell">{capitalize(post.category)}</div>
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
                    <PostActions postId={postId} postTitle={post.title}/>
                  </div>
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
  posts: state.posts,
  currentCategory: state.currentCategory
})

export default connect(mapStateToProps)(ViewPost);
