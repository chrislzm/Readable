import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class ListPosts extends Component {
  render() {

    const {categoryPath, categoryName} = this.props

    return(
      <div>
        <Link to={ `createPost${categoryPath}`}>Create New Post</Link>
        <div className="list-posts">
          <h2>{categoryName}</h2>
          <div className="list-posts-title">
            Post Title
          </div>
          <div className="list-books-date">
            Date
          </div>
          <div className="list-posts-votes">
            Votes
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  categories: state.categories
});

export default connect(mapStateToProps)(ListPosts);
