import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../../style/ListPosts.css'
import * as Constants from '../../constants'

class ListPosts extends Component {

  postFilter(postCategory,categoryName) {
    if(categoryName === Constants.DEFAULT_CATEGORY_NAME) return true
    return postCategory === categoryName
  }

  render() {
    const {categoryPath, categoryName, posts} = this.props
    return(
      <div>
        <h2>{categoryName}</h2>
        <Link to={ `createPost/${categoryPath}`}>Create New Post</Link>
        <div className="divTable">
          <div className="divTableBody">
            <div className="divTableRow">
              <div className="divTableCell">Category</div>
              <div className="divTableCell">Post Title</div>
              <div className="divTableCell">Date</div>
              <div className="divTableCell">Author</div>
              <div className="divTableCell">Votes</div>
            </div>
            { posts.filter(post => this.postFilter(post.category,categoryName)).map(post => (
              <div className="divTableRow" key={post.id}>
                <div className="divTableCell">{post.category}</div>
                <div className="divTableCell">{post.title}</div>
                <div className="divTableCell">{post.timestamp}</div>
                <div className="divTableCell">{post.author}</div>
                <div className="divTableCell">{post.voteScore}</div>
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
