import React, { Component } from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import * as Constants from '../../constants'
import { connect } from 'react-redux'
import { getCurrentCategoryPathAndName } from '../../utils/helpers'

class ListPosts extends Component {
  render() {

    const {categoryPath, categoryName} = getCurrentCategoryPathAndName(this.props.match.params.categoryPath,this.props.categories)

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

export default withRouter(connect(mapStateToProps)(ListPosts));
