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
      on the current editing mode.
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

  render() {
    let { editingMode, postId, commentId } = this.props

    // editDataFound <boolean>: When false, we are editing but the post/comment
    // not found in the Redux store. When true, the data was found, or we are
    // editing a new post/comment.
    let editDataFound = true

    let submitButtonText

    // Values used to pre-populate input fields
    let id, parentId, category, title, body, author, timestamp
    id = parentId = category = title = body = author = timestamp = ''

    // Control showing/hiding input fields (depending on editing mode)
    let showAuthor, showCategory, showTimestamp, showTitle

    // Configure the UI: Pre-populate and show/hide fields based on editingMode
    switch(editingMode) {
      // Mode: Editing an existing post
      case Constants.EDITOR_MODE_EDIT_POST: {
        const postToEdit = this.props.posts[postId]
        if(!postToEdit) {
          // Display "Content not found" message if the post doesn't exist
          editDataFound = false
        } else {
          // Pre-populate input fields
          id = postId
          title = postToEdit.title
          body = postToEdit.body
          author = postToEdit.author
          category = postToEdit.category
          timestamp = postToEdit.timestamp

          // Only show title and body when editing a post
          showAuthor = showCategory = showTimestamp = Constants.CSS_CLASS_HIDE
          showTitle = Constants.CSS_CLASS_SHOW

          submitButtonText = Constants.SUBMIT_BUTTON_TEXT_EDIT
        }
        break
      }
      // Mode: Editing an existing comment
      case Constants.EDITOR_MODE_EDIT_COMMENT:
        if(!this.props.comments[postId] || !this.props.comments[postId][commentId]) {
          // Display "Content not found" message if post/comment doesn't exist
          editDataFound = false
        } else {
          // Pre-populate input fields
          const commentToEdit = this.props.comments[postId][commentId]
          id = commentId
          parentId = postId
          body = commentToEdit.body
          timestamp = commentToEdit.timestamp

          // Only show timestamp and body when editing a comment
          showTimestamp = Constants.CSS_CLASS_SHOW
          showCategory = showTitle = showAuthor = Constants.CSS_CLASS_HIDE

          submitButtonText = Constants.SUBMIT_BUTTON_TEXT_EDIT
        }
        break
      // Mode: Add a new comment
      case Constants.EDITOR_MODE_ADD_COMMENT:
        parentId = postId

        // Only show author and body when adding a comment
        showAuthor = Constants.CSS_CLASS_SHOW
        showCategory = showTitle = showTimestamp = Constants.CSS_CLASS_HIDE

        submitButtonText = Constants.SUBMIT_BUTTON_TEXT_NEW_COMMENT
        break
      // Mode: Add a new post
      case Constants.EDITOR_MODE_ADD_POST:
      default:
        category = this.props.currentCategory.name

        // Hide timestamp field
        showAuthor = showCategory = showTitle = Constants.CSS_CLASS_SHOW
        showTimestamp = Constants.CSS_CLASS_HIDE

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
                <Table.Row className={showCategory}>
                  <Table.Cell>
                    Category
                  </Table.Cell>
                  <Table.Cell>
                    <select
                      name="category"
                      onSubmit={this.handleSubmit}
                      defaultValue={category}>
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
                <Table.Row className={showTitle}>
                  <Table.Cell>
                    Title
                  </Table.Cell>
                  <Table.Cell key={title}>
                    <input
                      type="text"
                      name="title"
                      defaultValue={title}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    Body
                  </Table.Cell>
                  <Table.Cell key={body}>
                    <textarea
                      name="body"
                      defaultValue={body}
                      ref={(input) => { this.body = input }}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row className={showAuthor}>
                  <Table.Cell>
                    Author
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      type="text"
                      name="author"
                      defaultValue={author}
                      ref={(input) => { this.author = input }}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row className={showTimestamp}>
                  <Table.Cell>
                    Time Stamp
                  </Table.Cell>
                  <Table.Cell key={timestamp}>
                    <input
                      type="text"
                      name="timestamp"
                      defaultValue={Moment(timestamp, "x").format(Constants.DATE_FORMAT_EDITOR)}
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
              value={id}
            />
            <input
              type="hidden"
              name="parentId"
              value={parentId}
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
