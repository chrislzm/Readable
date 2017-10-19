/*
  Readable: components/Editor.js
  By Chris Leung

  Description:

  React component that provides a form and input fields that handle ALL editing
  for the Readable app. There are four modes of editing:
  (1) adding new posts ("EDITOR_MODE_ADD_POST")
  (2) adding new comments ("EDITOR_MODE_ADD_COMMENT")
  (3) editing existing posts ("EDITOR_MODE_EDIT_POST")
  (4) editing existing comments ("EDITOR_MODE_EDIT_COMMENT")

  Editing mode is set by passing one of the "EDITOR_MODE" constants above into
  the editingMode prop. These constants are defined in [constants.js](../../utils/constants.js)

  Props:
    editingMode: <String Constant> Required. Used to determine the UI
      configuration along the handling of the form submit.
    postId: <String> Required when editing a post (EDITOR_MODE_EDIT_POST) or
      comment (EDITOR_MODE_EDIT_COMMENT). Used to pre-populate fields and to
      update the post/comment in both the backend server and the Redux Store.
    commentId: <String> Required when editing a comment
      (EDITOR_MODE_EDIT_COMMENT). Used to pre-populate fields and also to update
      the comment in both the backend server and the Redux Store.
    categories: <Redux State> Required. Use convertCategoriesToArray in
      helpers.js to convert state object to an array for convenience.
    posts: <Redux State> Required.
    currentCategory: <Redux State> Required.
    comments: <Redux State> Required.
*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Table } from 'semantic-ui-react'
import Modal from 'react-modal'
import Moment from 'moment'
import PropTypes from 'prop-types'
import serializeForm from 'form-serialize'
import * as Constants from '../../utils/constants'
import * as Helpers from '../../utils/helpers'
import * as CommentActions from '../actions/commentActions'
import * as PostActions from '../actions/postActions'

class Editor extends Component {

  static propTypes = {
    editingMode: PropTypes.string.isRequired,
    postId: PropTypes.string,
    commentId: PropTypes.string,
    categories: PropTypes.array.isRequired,
    posts: PropTypes.object.isRequired,
    currentCategory: PropTypes.object.isRequired,
    comments: PropTypes.object.isRequired
  }

  state = {
    modalOpen: false,
    modalMessage: ''
  }

  openModal = (modalMessage) => {
    this.setState({
      modalOpen: true,
      modalMessage
    })
  }

  closeModal = () => {
    this.setState({modalOpen: false})
  }

  componentDidMount() {
    const { editingMode, postId, commentId, dispatch } = this.props

    switch(editingMode) {
      case Constants.EDITOR_MODE_EDIT_POST:
        dispatch(PostActions.fetchPost(postId))
        break
      case Constants.EDITOR_MODE_EDIT_COMMENT:
        dispatch(CommentActions.fetchComment(commentId))
        break
      default:
    }
  }

  /*
    Method: handleSubmit
    Description: Handles edit form submission. Decides what action to take based
      on the current editing mode, validates form data and either displays a
      modal error message or saves (dispatches) the changes.
    Parameters:
      e: <Event> The form submission event.
  */
  handleSubmit = (e) => {
    e.preventDefault()
    const post = serializeForm(e.target, { hash: true })
    const {id, parentId, title, body, author, timestamp } = post

    // Every editing mode requires a body
    if (!body) {
      this.openModal(Constants.EDITOR_ERROR_MESSAGE_BLANK_BODY)
      return
    }

    switch(post.editingMode) {
      // Mode: Editing an existing post
      case Constants.EDITOR_MODE_EDIT_POST:
        if(!title) {
          this.openModal(Constants.EDITOR_ERROR_MESSAGE_BLANK_TITLE)
        } else {
          this.props.dispatch(PostActions.saveEditedPost(id,title,body))
          this.props.handleEdit()
        }
        break
      // Mode: Editing an existing comment
      case Constants.EDITOR_MODE_EDIT_COMMENT:
        // Verify whether the user's timestamp is in a valid format
        const newTimeStamp = Moment(timestamp,Constants.DATE_FORMAT_EDITOR)
        if(!newTimeStamp.isValid()) {
          this.openModal(Constants.EDITOR_ERROR_MESSAGE_INVALID_TIMESTAMP)
        } else {
          this.props.dispatch(CommentActions.saveEditedComment(id,parentId,body,newTimeStamp))
          this.props.handleEdit()
        }
        break
      // Mode: Adding a new comment
      case Constants.EDITOR_MODE_ADD_COMMENT:
        if (!author) {
          this.openModal(Constants.EDITOR_ERROR_MESSAGE_BLANK_AUTHOR)
        } else {
          this.props.dispatch(CommentActions.submitNewComment(body,author,parentId))
          // Clear form values so that user can easily enter new comment
          this.author.value = ''
          this.body.value = ''
          this.props.handleEdit()
        }
        break
      // Mode: Adding a new post
      case Constants.EDITOR_MODE_ADD_POST:
      // fall through
      default:
        if(!title) {
          this.openModal(Constants.EDITOR_ERROR_MESSAGE_BLANK_TITLE)
        } else if (!author) {
          this.openModal(Constants.EDITOR_ERROR_MESSAGE_BLANK_AUTHOR)
        } else {
          this.props.dispatch(PostActions.submitNewPost(post))
          this.props.handleEdit()
        }
    }
  }
  populateFieldsForEditPost(postId,postToEdit) {
    let prePopulatedFields = {}
    prePopulatedFields.id = postId
    prePopulatedFields.title = postToEdit.title
    prePopulatedFields.body = postToEdit.body
    prePopulatedFields.author = postToEdit.author
    prePopulatedFields.category = postToEdit.category
    prePopulatedFields.timestamp = postToEdit.timestamp
    return prePopulatedFields
  }

  setVisibleFieldsForEditPost() {
    let inputFieldVisibility = {}
    inputFieldVisibility.author = Constants.CSS_CLASS_HIDE
    inputFieldVisibility.category = Constants.CSS_CLASS_HIDE
    inputFieldVisibility.timestamp = Constants.CSS_CLASS_HIDE
    inputFieldVisibility.title = Constants.CSS_CLASS_SHOW
    return inputFieldVisibility
  }

  populateFieldsForEditComment(postId,commentId,commentToEdit) {
    let prePopulatedFields = {}
    prePopulatedFields.id = commentId
    prePopulatedFields.parentId = postId
    prePopulatedFields.body = commentToEdit.body
    prePopulatedFields.timestamp = Moment(commentToEdit.timestamp, "x").format(Constants.DATE_FORMAT_EDITOR)
    return prePopulatedFields
  }

  setVisibleFieldsForEditComment() {
    // Only show timestamp and body when editing a comment
    let inputFieldVisibility = {}
    inputFieldVisibility.timestamp = Constants.CSS_CLASS_SHOW
    inputFieldVisibility.category = Constants.CSS_CLASS_HIDE
    inputFieldVisibility.title = Constants.CSS_CLASS_HIDE
    inputFieldVisibility.author = Constants.CSS_CLASS_HIDE
    return inputFieldVisibility
  }

  populateFieldsForAddComment(postId) {
    let prePopulatedFields = {}
    prePopulatedFields.parentId = postId
    return prePopulatedFields
  }

  setVisibleFieldsForAddComment() {
    // Only show author and body when adding a comment
    let inputFieldVisibility = {}
    inputFieldVisibility.author = Constants.CSS_CLASS_SHOW
    inputFieldVisibility.category = Constants.CSS_CLASS_HIDE
    inputFieldVisibility.title = Constants.CSS_CLASS_HIDE
    inputFieldVisibility.timestamp = Constants.CSS_CLASS_HIDE
    return inputFieldVisibility
  }

  populateFieldsForAddPost(currentCategory) {
    let prePopulatedFields = {}
    prePopulatedFields.category = currentCategory.name
    return prePopulatedFields
  }

  setVisibleFieldsForAddPost() {
    // Hide timestamp field
    let inputFieldVisibility = {}
    inputFieldVisibility.author = Constants.CSS_CLASS_SHOW
    inputFieldVisibility.category = Constants.CSS_CLASS_SHOW
    inputFieldVisibility.title = Constants.CSS_CLASS_SHOW
    inputFieldVisibility.timestamp = Constants.CSS_CLASS_HIDE
    return inputFieldVisibility
  }

  render() {
    const { editingMode, postId, commentId, currentCategory } = this.props

    // editDataFound <boolean>: When false, we are editing but the post/comment
    // was not found in the Redux store. When true, the data was found, or we
    // are editing a new post/comment.
    let editDataFound = true

    let submitButtonText

    // Stores values used to pre-populate input fields
    let prePopulatedFields = {}

    // Stores visibility of input fields (which depends on editing mode)
    let inputFieldVisiblity = {}

    // Configure the UI: Pre-populate and show/hide fields based on editingMode
    switch(editingMode) {
      // Mode: Editing an existing post
      case Constants.EDITOR_MODE_EDIT_POST: {
        const postToEdit = this.props.posts[postId]
        if(!postToEdit) {
          editDataFound = false
        } else {
          prePopulatedFields = this.populateFieldsForEditPost(postId,postToEdit)
          inputFieldVisiblity = this.setVisibleFieldsForEditPost()
          submitButtonText = Constants.SUBMIT_BUTTON_TEXT_EDIT
        }
        break
      }
      // Mode: Editing an existing comment
      case Constants.EDITOR_MODE_EDIT_COMMENT:
        // If post or comment doesn't exist in Redux store
        if(!this.props.comments[postId] || !this.props.comments[postId][commentId]) {
          editDataFound = false
        } else {
          const commentToEdit = this.props.comments[postId][commentId]
          prePopulatedFields = this.populateFieldsForEditComment(postId,commentId,commentToEdit)
          inputFieldVisiblity = this.setVisibleFieldsForEditComment()
          submitButtonText = Constants.SUBMIT_BUTTON_TEXT_EDIT
        }
        break
      // Mode: Add a new comment
      case Constants.EDITOR_MODE_ADD_COMMENT:
        prePopulatedFields = this.populateFieldsForAddComment(postId)
        inputFieldVisiblity = this.setVisibleFieldsForAddComment()
        submitButtonText = Constants.SUBMIT_BUTTON_TEXT_NEW_COMMENT
        break
      // Mode: Add a new post
      case Constants.EDITOR_MODE_ADD_POST:
      default:
        prePopulatedFields = this.populateFieldsForAddPost(currentCategory)
        inputFieldVisiblity = this.setVisibleFieldsForAddPost()
        submitButtonText = Constants.SUBMIT_BUTTON_TEXT_NEW_POST
    }

    return (
      <div className="Editor">
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          contentLabel='Modal'>
          <div>
            {this.state.modalMessage}
          </div>
          <div>
            <button
              onClick={this.closeModal}>
              OK
            </button>
          </div>
        </Modal>
        { !editDataFound && (
            <div className="StatusMessage">
              {Constants.ERROR_MESSAGE_CONTENT_NOT_FOUND}
            </div>
          )}
        { editDataFound && (
        <form className="edit-post-form"
          onSubmit={this.handleSubmit}>
          <div className="edit-post-details">
            <Table definition>
              <Table.Body>
                <Table.Row className={inputFieldVisiblity.category}>
                  <Table.Cell>
                    Category
                  </Table.Cell>
                  <Table.Cell>
                    <select
                      name="category"
                      onSubmit={this.handleSubmit}
                      defaultValue={prePopulatedFields.category}>
                      {this.props.categories.map(category => (
                        <option
                          value={category.name}
                          key={category.path}>
                          {Helpers.capitalize(category.name)}
                        </option>
                      ))}
                    </select>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className={inputFieldVisiblity.title}>
                  <Table.Cell>
                    Title
                  </Table.Cell>
                  <Table.Cell key={prePopulatedFields.title}>
                    <input
                      type="text"
                      name="title"
                      defaultValue={prePopulatedFields.title}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    Body
                  </Table.Cell>
                  <Table.Cell key={prePopulatedFields.body}>
                    <textarea
                      name="body"
                      defaultValue={prePopulatedFields.body}
                      ref={(input) => { this.body = input }}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row className={inputFieldVisiblity.author}>
                  <Table.Cell>
                    Author
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      type="text"
                      name="author"
                      defaultValue={prePopulatedFields.author}
                      ref={(input) => { this.author = input }}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row className={inputFieldVisiblity.timestamp}>
                  <Table.Cell>
                    Time Stamp
                  </Table.Cell>
                  <Table.Cell key={prePopulatedFields.timestamp}>
                    <input
                      type="text"
                      name="timestamp"
                      defaultValue={prePopulatedFields.timestamp}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell/>
                  <Table.Cell>
                    <button>
                      {submitButtonText}
                    </button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <input
              type="hidden"
              name="id"
              value={prePopulatedFields.id}
            />
            <input
              type="hidden"
              name="parentId"
              value={prePopulatedFields.parentId}
            />
            <input
              type="hidden"
              name="editingMode"
              value={editingMode}
            />
          </div>
        </form>
      )}
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  categories: Helpers.convertCategoriesToArray(store.categories),
  posts:store.posts,
  currentCategory: store.currentCategory,
  comments:store.comments
})

export default withRouter(connect(mapStateToProps)(Editor))
