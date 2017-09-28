import React, { Component } from 'react'
import { connect } from 'react-redux'
import { capitalize } from '../../utils/helpers'

class PostEditor extends Component {

  handleSubmit = () => {
    // do something
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="edit-post-form">
          <div className="edit-post-details">
            <select defaultValue={this.props.categoryName}>
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
            <button>Post</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories
});

export default connect(mapStateToProps)(PostEditor)
