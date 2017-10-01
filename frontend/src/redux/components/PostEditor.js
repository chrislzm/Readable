import React, { Component } from 'react'
import { connect } from 'react-redux'
import { capitalize } from '../../utils/helpers'
import serializeForm from 'form-serialize'
import * as BackendAPI from '../../utils/api'
import { guid, convertCategoriesToArray } from '../../utils/helpers'
import * as Actions from '../actions'
import * as Constants from '../../constants'
import { withRouter } from 'react-router-dom'

class PostEditor extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.idInput.value = guid()
    this.timestampInput.value = Date.now()
    const post = serializeForm(e.target, { hash: true })
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
      this.props.history.push('/' + this.props.categoryPath)
    }
  }

  render() {
    let postCategory = this.props.categoryName
    let postId = this.props.match.params.postId
    let editing = postId ? true : false
    let submitButtonText = editing ? Constants.SUBMIT_EDITED_POST_BUTTON_TEXT : Constants.SUBMIT_NEW_POST_BUTTON_TEXT
    let postTitle, postBody, postAuthor
    if(editing && this.props.posts[postId]) {
      const postContent = this.props.posts[postId]
      postTitle = postContent.title
      postBody = postContent.body
      postAuthor = postContent.author
      postCategory = postContent.category
    } else {
      postId = postTitle = postBody = postAuthor = ''
    }
    return (
      <div className="PostEditor">
        <form onSubmit={this.handleSubmit} className="edit-post-form">
          <div className="edit-post-details">
            <div className="divTable blueTable">
              <div className="divTableBody">
                <div className="divTableRow">
                  <div className="divTableLabel">Category</div>
                  <div className="divTableCell">
                    <select
                      name="category"
                      onSubmit={this.handleSubmit}
                      defaultValue={postCategory}
                      disabled={editing}>
                      {this.props.categories.map(category => (
                        <option
                          value={category.name}
                          key={category.path}>
                          {capitalize(category.name)}
                        </option>
                      ))}
                    </select>
                  </div></div>
                  <div className="divTableRow">
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
                  <div className="divTableRow">
                    <div className="divTableLabel">Author</div>
                    <div className="divTableCell">
                      <input
                        type="text"
                        name="author"
                        value={postAuthor}
                        disabled={editing}/>
                    </div>
                  </div>
                  <input type="hidden" name="id" value={postId} ref={(input) => { this.idInput = input;}}/>
                  <input type="hidden" name="editing" value={editing} ref={(input) => { this.editing = input;}}/>
                  <input type="hidden" name="timestamp" ref={(input) => { this.timestampInput = input;}}/>
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
    posts:store.posts
  })

  export default withRouter(connect(mapStateToProps)(PostEditor))
