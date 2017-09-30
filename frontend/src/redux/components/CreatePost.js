import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentCategoryPathAndName } from '../../utils/helpers'
import { capitalize } from '../../utils/helpers'
import PostEditor from './PostEditor'

class CreatePost extends Component {
  render() {
    const {categoryPath, categoryName} = this.props.currentCategory
    return(
      <div>
        <PostEditor categoryPath={categoryPath}/>
        <Link to={'/' + categoryPath}>Back to {capitalize(categoryName)}</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  currentCategory: state.currentCategory
});

export default connect(mapStateToProps)(CreatePost)
