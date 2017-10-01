import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { capitalize } from '../../utils/helpers'
import PostEditor from './PostEditor'
import { withRouter } from 'react-router-dom'
import Modal from 'react-modal'

class CreatePost extends Component {

  state = {
    confirmModalOpen: false,
    newPostCategory: this.props.currentCategory.name
  }

  openConfirmModal = (categoryName) => {
    this.setState(() => ({
      confirmModalOpen: true,
      newPostCategory: categoryName
    }))
  }

  closeConfirmModal = (categoryPath) => {
    this.props.history.push(`/${categoryPath}`)
  }

  render() {
    const { confirmModalOpen } = this.state
    const categoryName = this.props.currentCategory.name
    const categoryPath = this.props.currentCategory.path
    return(
      <div>
        <div className="SectionTitle">
          <h2>
            Add New Post
          </h2>
          <div className="SectionTitleNav">
            <button>
              <Link to={ `/${categoryPath}`}>&lt; Back To {capitalize(categoryName)}</Link>
            </button>
          </div>
        </div>
        <PostEditor categoryPath={categoryPath} handleAddNewPost={this.openConfirmModal}/>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={confirmModalOpen}
          onRequestClose={this.closeConfirmModal}
          contentLabel='Modal'>
          <div>Post has been added to {capitalize(this.state.newPostCategory)}!</div>
          <div>
            <button onClick={() => this.closeConfirmModal(categoryPath)}>OK</button>
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  currentCategory: state.currentCategory
});

export default withRouter(connect(mapStateToProps)(CreatePost))
