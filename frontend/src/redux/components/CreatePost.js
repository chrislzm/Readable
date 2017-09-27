import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CreatePost extends Component {
  render() {
    const { currentCategoryName, currentCategoryPath } = this.props

    return(
      <Link to={currentCategoryPath}>Back to {currentCategoryName}</Link>
    )
  }
}

export default CreatePost
