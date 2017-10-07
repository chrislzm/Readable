import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import * as BackendAPI from '../../utils/api'
import * as Constants from '../../utils/constants'
import * as Helpers from '../../utils/helpers'
import * as ReduxStoreActions from '../actions'
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
        this.props.dispatch(ReduxStoreActions.addNewPost(post))
      }
    })
  }

  render() {
    const { modalOpen } = this.state
    const { postId, commentId } = this.props.match.params

    let editingMode, titleText

    if(commentId) {
      titleText = "Editing Comment"
      editingMode = Constants.EDITOR_EDIT_COMMENT_MODE
    } else {
      titleText = "Editing Post"
      editingMode = Constants.EDITOR_EDIT_POST_MODE
    }

    let postExists, pathToViewPost, categoryName, categoryPath

    if(this.props.posts[postId]) {
      postExists = true
      pathToViewPost = `/${categoryPath}/${postId}`
      categoryName = this.props.posts[postId].category.toLowerCase()
      categoryPath = this.props.categories[categoryName]
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
            {titleText}
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
