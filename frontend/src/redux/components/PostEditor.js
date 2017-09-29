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
    BackendAPI.addNewPost(post)
    let {id,...content} = post
    content.voteScore = Constants.DEFAULT_VOTES
    content.deleted = Constants.DEFAULT_DELETED_FLAG
    this.props.dispatch(Actions.addNewPost(id,content))
    this.props.history.push('/' + this.props.categoryPath)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="edit-post-form">
          <div className="edit-post-details">
            <select name="category" onSubmit={this.handleSubmit} defaultValue={this.props.categoryPath}>
              {this.props.categories.map(category => (
                <option
                  value={category.path}
                  disabled={false}
                  key={category.path}>
                  {capitalize(category.name)}
                </option>
              ))}
            </select>
            <input type="text" name="title" placeholder="Title"/>
            <input type="textarea" name="body" placeholder="Body"/>
            <input type="text" name="author" placeholder="Author"/>
            <input type="hidden" name="id" ref={(input) => { this.idInput = input;}}/>
            <input type="hidden" name="timestamp" ref={(input) => { this.timestampInput = input;}}/>
            <button>Post</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (store) => (convertCategoriesToArray(store.categories))

export default withRouter(connect(mapStateToProps)(PostEditor))
