import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../../style/ListPosts.css'

class ListPosts extends Component {
  render() {

    const {categoryPath, categoryName} = this.props
    console.log(categoryPath,categoryName)
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
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  categories: state.categories,
  posts: state.posts
});

export default connect(mapStateToProps)(ListPosts);
