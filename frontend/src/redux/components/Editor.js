/*
  Readable: components/Editor.js
  By Chris Leung

  Description:

  React component that provides a form and input fields that handle ALL editing
  for the Readable app. There are four modes of editing:
  (1) adding new posts (EDITOR_MODE_ADD_POST)
  (2) adding new comments (EDITOR_MODE_ADD_COMMENT)
  (3) editing existing posts (EDITOR_MODE_EDIT_POST)
  (4) editing existing comments (EDITOR_MODE_EDIT_COMMENT)

  Editing mode is setby passing one of the EDITOR_MODE constants above into the
  editingMode prop. These constants are defined in constants.js

  Props:
    editingMode: <String Constant> Required. It is used to determine the
      configuration of the UI along with the behavior of the submit operation.
    postId: <String> Required when editing a post (editingMode ===
      EDITOR_MODE_EDIT_POST) or comment (editingMode ===
      EDITOR_MODE_EDIT_COMMENT). Used to pre-populate fields and also to update
      the correct post/comment on both the backend server and the Redux Store.
    commentId: <String> Required when editing a comment (editingMode ===
      EDITOR_MODE_EDIT_COMMENT.  Used to pre-populate fields and also to update
      the correct comment on both the backend server and the Redux Store.
    Redux Store State: Mapped to props
*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Moment from 'moment'
import serializeForm from 'form-serialize'
import * as BackendAPI from '../../utils/api'
import * as Constants from '../../utils/constants'
import * as Helpers from '../../utils/helpers'
import * as ReduxStoreActions from '../actions'

class Editor extends Component {

  // If we are in comment editing mode then load the comment from the API server
  // and save it to the Redux Store
  componentDidMount() {
    const { editingMode} = this.props
    if(editingMode === Constants.EDITOR_MODE_EDIT_COMMENT) {
      const { commentId } = this.props
      BackendAPI.getComment(commentId).then(comment => {
          if(Object.keys(comment).length > 0) {
            const {parentId,...content} = comment
            this.props.dispatch(ReduxStoreActions.addNewComment(parentId,content))
          }
      })
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
    let {id, parentId, title, body, author, timestamp } = post

    // Every mode requires a body
    if (!body) {
      alert(Constants.EDITOR_ERROR_MESSAGE_BLANK_BODY)
      return
    }

    switch(post.editingMode) {
      // Mode: Editing an existing post
      case Constants.EDITOR_MODE_EDIT_POST:
        if(!title) {
          alert(Constants.EDITOR_ERROR_MESSAGE_BLANK_TITLE)
        } else {
          const editedPost = {
            title,
            body
          }
          BackendAPI.editPost(id,editedPost)
          this.props.dispatch(ReduxStoreActions.editPost(id,title,body))
          this.props.handleEdit()
        }
        break
      // Mode: Editing an existing comment
      case Constants.EDITOR_MODE_EDIT_COMMENT:
        // Verify whether the user's timestamp is in a valid format
        const newTimeStamp = Moment(timestamp,Constants.DATE_FORMAT_EDITOR)
        if(!newTimeStamp.isValid()) {
          alert("Time Stamp must be in a valid date format: MM-DD-YYYY hh:mm:SS.SSS AM/PM")
        } else {
          const timestamp = newTimeStamp.format("x")
          const editedComment = {
            timestamp,
            body
          }
          BackendAPI.editComment(id,editedComment)
          this.props.dispatch(ReduxStoreActions.editComment(id,parentId,body,timestamp))
          this.props.handleEdit()
        }
        break
      // Mode: Adding a new comment
      case Constants.EDITOR_MODE_ADD_COMMENT:
        if (!author) {
          alert(Constants.EDITOR_ERROR_MESSAGE_BLANK_AUTHOR)
        } else {
          const newComment = {
            id: Helpers.guid(),
            timestamp: Date.now(),
            body,
            author,
            parentId
          }
          BackendAPI.addNewComment(newComment)
          this.props.dispatch(ReduxStoreActions.addNewComment(parentId,newComment))
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
          alert(Constants.EDITOR_ERROR_MESSAGE_BLANK_TITLE)
        } else if (!author) {
          alert(Constants.EDITOR_ERROR_MESSAGE_BLANK_AUTHOR)
        } else {
          post.id = Helpers.guid()
          post.timestamp = Date.now()
          post.voteScore = Constants.DEFAULT_VOTES
          post.deleted = Constants.DEFAULT_DELETED_FLAG
          BackendAPI.addNewPost(post)
          this.props.dispatch(ReduxStoreActions.addNewPost(post))
          this.props.handleEdit()
        }
    }
  }

  render() {
    let { editingMode, postId, commentId } = this.props

    // These vars hold values used to pre-populate input fields
    let id, parentId, category, title, body, author, timestamp
    id = parentId = category = title = body = author = timestamp = ''

    // editDataFound: When true, display content, when false, display "Not
    // Found" message. This will only be set to false if we are editing a
    // post/comment and its data does not exist in the Redux Store.
    let editDataFound = true

    // These vars control showing/hiding certain input fields depending on the
    // editing mode
    let showAuthor, showCategory, showTimestamp, showTitle

    let submitButtonText

    switch(editingMode) {
      // Mode: Editing an existing post
      case Constants.EDITOR_MODE_EDIT_POST:
        const postToEdit = this.props.posts[postId]
        if(!postToEdit) {
          editDataFound = false
        } else {
          id = postId
          title = postToEdit.title
          body = postToEdit.body
          author = postToEdit.author
          category = postToEdit.category
          timestamp = postToEdit.timestamp
          showAuthor = showCategory = showTimestamp = false
          showTitle = true
          submitButtonText = Constants.SUBMIT_BUTTON_TEXT_EDIT
        }
        break
      // Mode: Editing an existing comment
      case Constants.EDITOR_MODE_EDIT_COMMENT:
        if(!this.props.comments[postId] || !this.props.comments[postId][commentId]) {
          editDataFound = false
        } else {
          const commentToEdit = this.props.comments[postId][commentId]
          id = commentId
          parentId = postId
          body = commentToEdit.body
          timestamp = commentToEdit.timestamp
          showTimestamp = true
          showCategory = showTitle = showAuthor = false
          submitButtonText = Constants.SUBMIT_BUTTON_TEXT_EDIT
        }
        break
      // Mode: Add a new comment
      case Constants.EDITOR_MODE_ADD_COMMENT:
        parentId = postId
        showAuthor = true
        showCategory = showTitle = showTimestamp = false
        submitButtonText = Constants.SUBMIT_BUTTON_TEXT_NEW_COMMENT
        break
      // Mode: Add a new post
      case Constants.EDITOR_MODE_ADD_POST:
      default:
        category = this.props.currentCategory.name
        showAuthor = showCategory = showTitle = true
        showTimestamp = false
        submitButtonText = Constants.SUBMIT_BUTTON_TEXT_NEW_POST
    }

    return (
      <div className="PostEditor">
        { !editDataFound && (
            <div className="StatusMessage">Not found</div>
          )}
        { editDataFound && (
        <form onSubmit={this.handleSubmit} className="edit-post-form">
          <div className="edit-post-details">
            <div className="divTable blueTable">
              <div className="divTableBody">
                <div
                  className="divTableRow"
                  style={{display: showCategory ? 'table-row':'none'}}>
                  <div className="divTableLabel">Category</div>
                  <div className="divTableCell">
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
                  </div></div>
                  <div
                    className="divTableRow"
                    style={{display: showTitle ? 'table-row':'none'}}>
                    <div className="divTableLabel">Title</div>
                    <div className="divTableCell" key={title}>
                      <input type="text" name="title" defaultValue={title}/>
                    </div>
                  </div>
                  <div className="divTableRow">
                    <div className="divTableLabel">Body</div>
                    <div className="divTableCell" key={body}>
                      <textarea name="body" defaultValue={body} ref={(input) => { this.body = input }}/>
                    </div>
                  </div>
                  <div
                    className="divTableRow"
                    style={{display: showAuthor ? 'table-row':'none'}}>
                    <div className="divTableLabel">Author</div>
                    <div className="divTableCell">
                      <input
                        type="text"
                        name="author"
                        defaultValue={author}
                        ref={(input) => { this.author = input }}/>
                    </div>
                  </div>
                  <div
                    className="divTableRow"
                    style={{display: showTimestamp ? 'table-row':'none'}}>
                    <div className="divTableLabel">Time Stamp</div>
                    <div className="divTableCell" key={timestamp}>
                      <input
                        type="text"
                        name="timestamp"
                        defaultValue={Moment(timestamp, "x").format(Constants.DATE_FORMAT_EDITOR)}/>
                    </div>
                  </div>
                <input type="hidden" name="id" value={id}/>
                <input type="hidden" name="parentId" value={parentId}/>
                <input type="hidden" name="editingMode" value={editingMode}/>
                <div className="divTableRow">
                  <div className="divTableLabel"></div>
                  <div className="divTableCell">
                    <button>{submitButtonText}</button>
                  </div>
                </div>
              </div>
            </div>
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
