import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Editor from './Editor'
import * as Constants from '../../utils/constants'
import * as Helpers from '../../utils/helpers'

class AddPost extends Component {

  state = {
    modalOpen: false,
  }

  openModal = (categoryName) => {
    this.setState({modalOpen: true})
  }

  closeModal = (categoryPath) => {
    this.props.history.push(`/${categoryPath}`)
  }

  render() {
    const { modalOpen } = this.state
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
              <Link to={ `/${categoryPath}`}>&lt; Back To {Helpers.capitalize(categoryName)}</Link>
            </button>
          </div>
        </div>
        <Editor
          handleAddNewPost={this.openModal}
          editingMode={Constants.EDITOR_MODE_ADD_POST}/>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={modalOpen}
          onRequestClose={this.closeModal}
          contentLabel='Modal'>
          <div>Post has been added!</div>
          <div>
            <button onClick={() => this.closeModal(categoryPath)}>OK</button>
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

export default withRouter(connect(mapStateToProps)(AddPost))
