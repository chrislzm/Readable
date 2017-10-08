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

  handleSubmit = (e) => {
    e.preventDefault()
    const post = serializeForm(e.target, { hash: true })
    let {id, parentId, title, body, timestamp } = post
    switch(post.editingMode) {
      case Constants.EDITOR_MODE_EDIT_POST:
        const editedPost = {
          title,
          body
        }
        BackendAPI.editPost(id,editedPost)
        this.props.dispatch(ReduxStoreActions.editPost(id,title,body))
        this.props.handleEdit()
        break
      case Constants.EDITOR_MODE_EDIT_COMMENT:
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
      case Constants.EDITOR_MODE_ADD_COMMENT:
        if (!post.body) {
          alert("Error: Body cannot be blank")
        } else if (!post.author) {
          alert("Error: Author cannot be blank")
        } else {
          const newComment = {
            id: Helpers.guid(),
            timestamp: Date.now(),
            body: post.body,
            author: post.author,
            parentId
          }
          BackendAPI.addNewComment(newComment)
          this.props.dispatch(ReduxStoreActions.addNewComment(parentId,newComment))
          this.author.value = ''
          this.body.value = ''
          this.props.handleEdit()
        }
        break
      case Constants.EDITOR_MODE_ADD_POST:
      // fall through
      default:
        if(!post.title) {
          alert("Error: Title cannot be blank")
        } else if (!post.body) {
          alert("Error: Body cannot be blank")
        } else if (!post.author) {
          alert("Error: Author cannot be blank")
        } else {
          post.id = Helpers.guid()
          post.timestamp = Date.now()
          post.voteScore = Constants.DEFAULT_VOTES
          post.deleted = Constants.DEFAULT_DELETED_FLAG
          BackendAPI.addNewPost(post)
          this.props.dispatch(ReduxStoreActions.addNewPost(post))
          this.props.handleAddNewPost(post.category)
        }
    }
  }

  render() {
    let { editingMode, postId, commentId } = this.props
    // These vars hold default values for input fields
    let id, parentId, category, title, body, author, timestamp
    id = parentId = category = title = body = author = timestamp = ''
    let editDataNotFound = false
    // These vars toggle input fields/button text for different editing modes
    let showAuthor, showCategory, showTimestamp, showTitle, submitButtonText
    switch(editingMode) {
      case Constants.EDITOR_MODE_EDIT_POST:
        const postToEdit = this.props.posts[postId]
        if(postToEdit) {
          id = postId
          title = postToEdit.title
          body = postToEdit.body
          author = postToEdit.author
          category = postToEdit.category
          timestamp = postToEdit.timestamp
          showAuthor = showCategory = showTimestamp = false
          showTitle = true
          submitButtonText = Constants.SUBMIT_BUTTON_TEXT_EDIT
        } else {
          editDataNotFound = true
        }
        break
      case Constants.EDITOR_MODE_EDIT_COMMENT:
        if(this.props.comments[postId] && this.props.comments[postId][commentId]) {
          const commentToEdit = this.props.comments[postId][commentId]
          id = commentId
          parentId = postId
          body = commentToEdit.body
          timestamp = commentToEdit.timestamp
          showTimestamp = true
          showCategory = showTitle = showAuthor = false
          submitButtonText = Constants.SUBMIT_BUTTON_TEXT_EDIT
        } else {
          editDataNotFound = true
        }
        break
      case Constants.EDITOR_MODE_ADD_COMMENT:
        parentId = postId
        showAuthor = true
        showCategory = showTitle = showTimestamp = false
        submitButtonText = Constants.SUBMIT_BUTTON_TEXT_NEW_COMMENT
        break
      case Constants.EDITOR_MODE_ADD_POST:
      default:
        category = this.props.currentCategory.name
        showAuthor = showCategory = showTitle = true
        showTimestamp = false
        submitButtonText = Constants.SUBMIT_BUTTON_TEXT_NEW_POST
    }

    return (
      <div className="PostEditor">
        { // If timestamp data is empty, then this post/comment has been deleted
          editDataNotFound && (
            <div className="StatusMessage">Not found</div>
          )}
        { !editDataNotFound && (
        <form onSubmit={this.handleSubmit} className="edit-post-form">
          <div className="edit-post-details">
            <div className="divTable blueTable">
              <div className="divTableBody">
                <div className="divTableRow" style={{display: showCategory ? 'table-row':'none'}}>
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
                  <div className="divTableRow" style={{display: showTitle ? 'table-row':'none'}}>
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
                  <div className="divTableRow" style={{display: showAuthor ? 'table-row':'none'}}>
                    <div className="divTableLabel">Author</div>
                    <div className="divTableCell">
                      <input
                        type="text"
                        name="author"
                        defaultValue={author}
                        ref={(input) => { this.author = input }}/>
                    </div>
                  </div>
                  <div className="divTableRow" style={{display: showTimestamp ? 'table-row':'none'}}>
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
