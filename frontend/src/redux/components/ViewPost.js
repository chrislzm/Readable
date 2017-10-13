/*
  Readable: components/ViewPost.js
  By Chris Leung

  Description:

  React component that displays the a post along with a form to add a new
  comment and all comments for the post. Uses the Viewer component to display
  the post content, AddComment to display the add comment form and handle adding
  coments, and ListComments to list all the comments for this post.

  Props:
    React Router Param Match: Provides the post id (see App.js)
    Redux Store State: Mapped to props
*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as BackendAPI from '../../utils/api'
import * as Constants from '../../utils/constants'
import * as Helpers from '../../utils/helpers'
import * as ReduxStoreActions from '../actions'
import AddComment from './AddComment'
import ListComments from './ListComments'
import Viewer from './Viewer'

class ViewPost extends Component {

  componentDidMount() {
    const { postId } = this.props.match.params
    BackendAPI.getPost(postId).then(post => {
      if(Object.keys(post).length > 0) {
        // Only add the post if it exists and has data
        this.props.dispatch(ReduxStoreActions.addNewPost(post))
      }
    })
  }

  render() {
    const categoryName = this.props.currentCategory.name
    const categoryPath = this.props.currentCategory.path
    const { postId } = this.props.match.params
    let post = this.props.posts[postId]
    if(post) {
      // If the post exists in the Redux store, store the id into the object we
      // received (it won't have the id in it, since the store contains an id to
      // content mapping). We will pass this object to the Viewer component,
      // which needs the id.
      post.id = postId
    }
    return (
      <div>
        { post && !post.deleted && (
          <div className="VieWPost">
            <div className="SectionTitle">
              <h2>{Helpers.capitalize(post.category)}: "{ post.title }"</h2>
              <div className="SectionTitleNav">
                <button>
                  <Link to={ `/${categoryPath}`}>&lt; Back To {Helpers.capitalize(categoryName)}</Link>
                </button>
              </div>
            </div>
            <Viewer content={post} mode={Constants.CONTENT_MODE_POST}/>
            <AddComment postId={postId}/>
            <ListComments parentId={postId}/>
          </div>
        )}
        { post && post.deleted  && (
          <div className="VieWPost">
            <div className="SectionTitle">
              <h2>Post Deleted</h2>
            </div>
          </div>
        )}
        { !post && (
          <div className="VieWPost">
            <div className="SectionTitle">
              <h2>Post not found</h2>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  currentCategory: state.currentCategory
})

export default connect(mapStateToProps)(ViewPost);
