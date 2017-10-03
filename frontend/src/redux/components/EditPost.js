import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { capitalize } from '../../utils/helpers'
import * as Constants from '../../utils/constants'
import PostEditor from './PostEditor'
import { withRouter } from 'react-router-dom'
import Modal from 'react-modal'

class EditPost extends Component {

  state = {
    confirmModalOpen: false
  }

  openConfirmModal = () => {
    this.setState(() => ({
      confirmModalOpen: true
    }))
  }

  closeConfirmModal = () => {
    this.setState(() => ({
      confirmModalOpen: false
    }))
  }

  render() {
    const { confirmModalOpen } = this.state
    const postId = this.props.match.params.postId
    let categoryName = this.props.currentCategory.name
    let categoryPath = this.props.currentCategory.path
    if(this.props.posts[postId]) {
      categoryName = this.props.posts[postId].category.toLowerCase()
      categoryPath = this.props.categories[categoryName]
    }
    const pathToViewPost = `/${categoryPath}/${postId}`

    return(
      <div className="EditPost">
        <div className="SectionTitle">
          <h2>
            Editing Post
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
        <PostEditor categoryPath={categoryPath} editPostId={postId} handleEdit={this.openConfirmModal} />
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={confirmModalOpen}
          onRequestClose={this.closeConfirmModal}
          contentLabel='Modal'>
          <div>Changes have been saved!</div>
          <div>
            <button onClick={this.closeConfirmModal}>OK</button>
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

export default withRouter(connect(mapStateToProps)(EditPost))
