import React, { Component } from 'react'
import Moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Constants from '../../constants'
import PostActions from './PostActions'
import { capitalize } from '../../utils/helpers'
import ListComments from './ListComments'

class ViewPost extends Component {
  render() {
    const categoryName = this.props.currentCategory.name
    const categoryPath = this.props.currentCategory.path
    const postId = this.props.match.params.postId
    const post = this.props.posts[postId]
    if(post) {
      post.category = capitalize(post.category)
    }
    return (
      <div>
        { post && (
          <div className="VieWPost">
            <div className="SectionTitle">
              <h2>{post.category}: "{ post.title }"</h2>
              <div className="SectionTitleNav">
                <button>
                  <Link to={ `/${categoryPath}`}>&lt; Back To {capitalize(categoryName)}</Link>
                </button>
              </div>
            </div>
            <div className="divTable blueTable">
              <div className="divTableBody">
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
            <ListComments postId={postId}/>
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
