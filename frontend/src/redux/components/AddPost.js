/*
  Readable: components/AddPost.js
  By Chris Leung

  Description:

  React component that allows the user to add a post. It utilizes the Editor.js
  component, which entirely handles the form display, input, validation, and
  submission of form data to the local Redux store and backend API server.

  Contains one modal window that displays a confirmation message after the post
  has been successfully added.

  The URL path to this component is set in [constants.js](../../utils/constants.js) "PATH_ADD_POST".

  Props:
    categories: <Redux State> Required.
    currentCategory: <Redux State> Required.
*/

import React, { Component } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Editor from './Editor'
import * as Constants from '../../utils/constants'
import * as Helpers from '../../utils/helpers'

class AddPost extends Component {

  static propTypes = {
    categories: PropTypes.object.isRequired,
    currentCategory: PropTypes.object.isRequired
  }

  state = {
    modalOpen: false,
  }

  openModal = () => {
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
              <Link
                to={ `/${categoryPath}`}>
                &lt; Back To {Helpers.capitalize(categoryName)}
              </Link>
            </button>
          </div>
        </div>
        <Editor
          handleEdit={this.openModal}
          editingMode={Constants.EDITOR_MODE_ADD_POST}/>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={modalOpen}
          onRequestClose={this.closeModal}
          contentLabel='Modal'>
          <div>
            Post has been added!
          </div>
          <div>
            <button
              onClick={() => this.closeModal(categoryPath)}>
              OK
            </button>
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
