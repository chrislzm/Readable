import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as Constants from '../../utils/constants'
import Moment from 'moment'
import PostActions from './PostActions'
import { setCurrentCategory } from '../actions'
import { capitalize } from '../../utils/helpers'

class ListPosts extends Component {

  filter(postCategory,categoryName) {
    if(categoryName === Constants.ALL_POSTS_CATEGORY_NAME) return true
    return postCategory.toLowerCase() === categoryName.toLowerCase()
  }

  componentDidMount() {
    this.props.dispatch(setCurrentCategory(this.props.categoryName, this.props.categoryPath))
  }

  render() {
    const { categoryName, posts} = this.props
    return(
      <div className="ListPosts">
        <div className="SectionTitle">
          <h2>{capitalize(categoryName)}</h2>
          <div className="SectionTitleNav">
            <button>
              <Link to={`/${Constants.CREATE_POST_PATH}`}>+ Add New Post</Link>
            </button>
          </div>
        </div>
        <div className="divTable blueTable">
          <div className="divTableHeading">
            <div className="divTableRow">
              <div className="divTableHead">Category</div>
              <div className="divTableHead">Post Title</div>
              <div className="divTableHead">Date</div>
              <div className="divTableHead">Author</div>
              <div className="divTableHead">Votes</div>
              <div className="divTableHead">Actions</div>

            </div>
          </div>
          <div className="divTableBody">
            { posts.filter(post => this.filter(post.category,categoryName)).map(post => (
              <div className="divTableRow" key={post.id}>
                <div className="divTableCell">{capitalize(post.category)}</div>
                <div className="divTableCell"><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></div>
                <div className="divTableCell">{Moment(post.timestamp, "x").format(Constants.DEFAULT_DATE_FORMAT)}</div>
                <div className="divTableCell">{post.author}</div>
                <div className="divTableCell">{post.voteScore}</div>
                <div className="divTableCell">
                  <PostActions postId={post.id} postTitle={post.title}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  posts: Object.keys(state.posts).map(id => {
    let post = state.posts[id]
    post.id = id
    return post
  })
})

export default connect(mapStateToProps)(ListPosts);
