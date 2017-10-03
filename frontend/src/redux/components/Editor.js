import React, { Component } from 'react'
import { connect } from 'react-redux'
import { capitalize } from '../../utils/helpers'
import serializeForm from 'form-serialize'
import * as BackendAPI from '../../utils/api'
import { guid, convertCategoriesToArray } from '../../utils/helpers'
import * as Actions from '../actions'
import * as Constants from '../../utils/constants'
import { withRouter } from 'react-router-dom'

class Editor extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const post = serializeForm(e.target, { hash: true })
    switch(post.editingMode) {
      case Constants.EDITOR_EDIT_POST_MODE:
        const {id, title, body} = post
        const editedPost = {
          title,
          body
        }
        BackendAPI.editPost(id,editedPost)
        this.props.dispatch(Actions.editPost(id,title,body))
        this.props.handleEdit()
        break
      case Constants.EDITOR_ADD_POST_MODE:
      // fall through
      default:
        post.id = guid()
        post.timestamp = Date.now()
        if(!post.title) {
          alert("Error: Title cannot be blank")
        } else if (!post.body) {
          alert("Error: Body cannot be blank")
        } else if (!post.author) {
          alert("Error: Author cannot be blank")
        } else {
          BackendAPI.addNewPost(post)
          let {id,...content} = post
          content.voteScore = Constants.DEFAULT_VOTES
          content.deleted = Constants.DEFAULT_DELETED_FLAG
          this.props.dispatch(Actions.addNewPost(id,content))
          this.props.handleAddNewPost(post.category)
        }
    }
  }

  render() {
    let { editingMode } = this.props
    // These vars hold default values for input fields
    let postId, postCategory, postTitle, postBody, postAuthor
    // These vars toggle input fields/button text for different editing modes
    let showAuthor, showCategory, showTitle, submitButtonText

    switch(editingMode) {
      case Constants.EDITOR_EDIT_POST_MODE:
        postId = this.props.match.params.postId
        const postToEdit = this.props.posts[postId]
        if(postToEdit) {
          postTitle = postToEdit.title
          postBody = postToEdit.body
          postAuthor = postToEdit.author
          postCategory = postToEdit.category
          showAuthor = false
          showCategory = false
          showTitle = true
          submitButtonText = Constants.SUBMIT_EDITED_POST_BUTTON_TEXT
        }
        break
      case Constants.EDITOR_ADD_POST_MODE:
        // fall through
      default:
        postId = postTitle = postBody = postAuthor = ''
        postCategory = this.props.currentCategory.name
        showAuthor = showCategory = showTitle = true
        submitButtonText = Constants.SUBMIT_NEW_POST_BUTTON_TEXT
    }

    return (
      <div className="PostEditor">
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
                      defaultValue={postCategory}>
                      {this.props.categories.map(category => (
                        <option
                          value={category.name}
                          key={category.path}>
                          {capitalize(category.name)}
                        </option>
                      ))}
                    </select>
                  </div></div>
                  <div className="divTableRow" style={{display: showTitle ? 'table-row':'none'}}>
                    <div className="divTableLabel">Title</div>
                    <div className="divTableCell" key={postTitle}>
                      <input type="text" name="title" defaultValue={postTitle}/>
                    </div>
                  </div>
                  <div className="divTableRow">
                    <div className="divTableLabel">Body</div>
                    <div className="divTableCell" key={postBody}>
                      <textarea name="body" defaultValue={postBody}/>
                    </div>
                  </div>
                  <div className="divTableRow" style={{display: showAuthor ? 'table-row':'none'}}>
                    <div className="divTableLabel">Author</div>
                    <div className="divTableCell">
                      <input
                        type="text"
                        name="author"
                        defaultValue={postAuthor}/>
                      </div>
                    </div>
                    <input type="hidden" name="id" value={postId}/>
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
          </div>
        )
      }
    }

    const mapStateToProps = (store) => ({
      categories: convertCategoriesToArray(store.categories),
      posts:store.posts,
      currentCategory: store.currentCategory
    })

    export default withRouter(connect(mapStateToProps)(Editor))
