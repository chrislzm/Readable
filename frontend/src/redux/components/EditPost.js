import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { capitalize } from '../../utils/helpers'
import PostEditor from './PostEditor'

class EditPost extends Component {
  render() {
    const postId = this.props.match.params.postId
    const {categoryPath, categoryName} = this.props.currentCategory
    return(
      <div>
        <div className="SectionTitle">
          <h2>
            Editing Post
          </h2>
          <div className="SectionTitleNav">
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
  currentCategory: state.currentCategory
});

export default connect(mapStateToProps)(EditPost)
