import React, { Component } from 'react'
import { connect } from 'react-redux'
import { capitalize } from '../../utils/helpers'
import serializeForm from 'form-serialize'
import { addNewPost } from '../../utils/api'
import { guid, convertCategoriesToArray } from '../../utils/helpers'

class PostEditor extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.idInput.value = guid()
    this.timestampInput.value = Date.now()
    const values = serializeForm(e.target, { hash: true })
    addNewPost(values)
    console.log(values)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="edit-post-form">
          <div className="edit-post-details">
            <select name="category" onSubmit={this.handleSubmit} defaultValue={this.props.categoryName}>
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

export default connect(mapStateToProps)(PostEditor)
