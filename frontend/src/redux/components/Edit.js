/*
  Readable: components/Edit.js
  By Chris Leung

  Description:

  React component that allows the user to edit a post or comment. It utilizes
  the Editor.js component, which entirely handles the form display, input,
  validation, and submission of form data to the local Redux store and backend
  API server.

  Contains one modal window that displays a confirmation message after the post
  or comment has been successfully edited (and changes have been saved).

  The URL path to this component is set in constants.js "PATH_EDIT".

  Props:
    postId: <String> Required. Contains the id of the parent post when we are
      editing a comment.
    commentId: <String> If an argument is provided, then will be editing the
      comment in the commentId provided where its parentId === postId.
    Redux Store State: Mapped to props
*/

import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import * as BackendAPI from '../../utils/api'
import * as Constants from '../../utils/constants'
import * as Helpers from '../../utils/helpers'
import * as PostActions from '../actions/postActions'
import Editor from './Editor'

class Edit extends Component {

  state = {
    modalOpen: false
  }

  openModal = () => {
    this.setState({modalOpen: true})
  }

  closeModal = () => {
    this.setState({modalOpen: false})
  }

  componentDidMount() {
    const { postId } = this.props.match.params
    BackendAPI.getPost(postId).then(post => {
      // Verify this is an existing post--if it is, it will have data
      if(Object.keys(post).length > 0) {
        this.props.dispatch(PostActions.addNewPost(post))
      }
    })
  }

  render() {
    const { modalOpen } = this.state
    const { postId, commentId } = this.props.match.params

    let editingMode, sectionTitle

    // If a commentId was passed in, then we are editing a comment. Set mode.
    if(commentId) {
      editingMode = Constants.EDITOR_MODE_EDIT_COMMENT
      sectionTitle = Constants.EDIT_SECTION_TITLE_COMMENT
    } else {
      editingMode = Constants.EDITOR_MODE_EDIT_POST
      sectionTitle = Constants.EDIT_SECTION_TITLE_POST
    }

    // When true, displays content. When false, displays "Not found" message
    let postExists
    // These variables are used to generate button links back to post & category
    let pathToViewPost, categoryName, categoryPath
    // Test whether post exists/has been loaded into the Redux Store
    if(this.props.posts[postId]) {
      postExists = true
      categoryName = this.props.posts[postId].category.toLowerCase()
      categoryPath = this.props.categories[categoryName]
      pathToViewPost = `/${categoryPath}/${postId}`
    } else {
      postExists = false
      // Use default category name and path for linking instead
      categoryName = this.props.currentCategory.name
      categoryPath = this.props.currentCategory.path
    }

    return(
      <div className="EditPost">
        <div className="SectionTitle">
          <h2>
            {sectionTitle}
          </h2>
          <div className="SectionTitleNav">
            { postExists && (
            <button>
              <Link to={pathToViewPost}>&lt; View Post</Link>
            </button>
          )}
            <button>
              <Link to={`/${categoryPath}`}>&lt; Back To {Helpers.capitalize(categoryName)}</Link>
            </button>
          </div>
        </div>
        { !postExists && (
          <div className="StatusMessage">Not found</div>
        )}
        { postExists && (
          <div>
        <Editor
          categoryPath={categoryPath}
          postId={postId}
          commentId={commentId}
          handleEdit={this.openModal}
          editingMode={editingMode}/>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={modalOpen}
          onRequestClose={this.closeModal}
          contentLabel='Modal'>
          <div>Changes have been saved!</div>
          <div>
            <button onClick={this.closeModal}>OK</button>
          </div>
        </Modal>
      </div>
       )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  currentCategory: state.currentCategory,
  posts:state.posts
});

export default withRouter(connect(mapStateToProps)(Edit))
