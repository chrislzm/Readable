import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { capitalize } from '../../utils/helpers'
import * as Constants from '../../utils/constants'
import Editor from './Editor'
import { withRouter } from 'react-router-dom'
import Modal from 'react-modal'
import * as BackendAPI from '../../utils/api'
import { addNewPost } from '../actions'

class Edit extends Component {

  state = {
    modalOpen: false
  }

  componentDidMount() {
    const { postId } = this.props.match.params
    BackendAPI.getPost(postId).then(post => {
      // Verify this is an existing post--if it is, it will have data
      if(Object.keys(post).length > 0) {
        this.props.dispatch(addNewPost(post))
      }
    })
  }

  openModal = () => {
    this.setState({modalOpen: true})
  }

  closeModal = () => {
    this.setState({modalOpen: false})
  }

  render() {
    const { modalOpen } = this.state
    const { postId, commentId } = this.props.match.params
    let categoryName = this.props.currentCategory.name
    let categoryPath = this.props.currentCategory.path
    if(this.props.posts[postId]) {
      categoryName = this.props.posts[postId].category.toLowerCase()
      categoryPath = this.props.categories[categoryName]
    }
    const pathToViewPost = `/${categoryPath}/${postId}`

    let editingMode, titleText
    if(commentId) {
      titleText = "Editing Comment"
      editingMode = Constants.EDITOR_EDIT_COMMENT_MODE
    } else {
      titleText = "Editing Post"
      editingMode = Constants.EDITOR_EDIT_POST_MODE
    }

    return(
      <div className="EditPost">
        <div className="SectionTitle">
          <h2>
            {titleText}
          </h2>
          <div className="SectionTitleNav">
            <button>
              <Link to={pathToViewPost}>&lt; View Post</Link>
            </button>
            <button>
              <Link to={`/${categoryPath}`}>&lt; Back To {capitalize(categoryName)}</Link>
            </button>
          </div>
        </div>
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
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  currentCategory: state.currentCategory,
  posts:state.posts
});

export default withRouter(connect(mapStateToProps)(Edit))
