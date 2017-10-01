import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { capitalize } from '../../utils/helpers'
import PostEditor from './PostEditor'
import { withRouter } from 'react-router-dom'

class EditPost extends Component {
  render() {
    const postId = this.props.match.params.postId
    let {categoryName,categoryPath} = this.props.currentCategory
    if(this.props.posts[postId]) {
      categoryName = this.props.posts[postId].category.toLowerCase()
      categoryPath = this.props.categories[categoryName]
    }

    return(
      <div>
        <div className="SectionTitle">
          <h2>
            Editing Post
          </h2>
          <div className="SectionTitleNav">
            <button>
              <Link to={ `/${categoryPath}/${postId}`}>&lt; Back To Post</Link>
            </button>
            <button>
              <Link to={ `/${categoryPath}`}>&lt; Back To {capitalize(categoryName)}</Link>
            </button>
          </div>
        </div>
        <PostEditor categoryPath={categoryPath} editPostId={postId} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  currentCategory: state.currentCategory,
  posts:state.posts
});

export default withRouter(connect(mapStateToProps)(EditPost))
