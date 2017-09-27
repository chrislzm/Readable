import React, { Component } from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import * as Constants from '../../constants'
import { connect } from 'react-redux'


class ListPosts extends Component {
  render() {

    let {categoryPath} = this.props.match.params
    let categoryName

    // If a path to a category wasn't defined, or we haven't loaded categories from the server yet
    if(!categoryPath || this.props.categories.length == 0) {
      // Assign default category and path
      categoryPath = Constants.DEFAULT_CATEGORY_PATH
      categoryName = Constants.DEFAULT_CATEGORY_NAME
    } else {
      // Otherwise look up the category name based on the path
      categoryName = this.props.categories.find(category => category.path === categoryPath).name
    }

    return(
      <div>
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
