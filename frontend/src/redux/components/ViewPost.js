/*
  Readable: components/ViewPost.js
  By Chris Leung

  Description:

  React component that displays the a post along with a form to add a new
  comment and all comments for the post. Uses React Router to match URL
  parameter for the postId (required) -- refer to Route statement in App.js.

  Uses the Viewer component to display the post content, AddComment to display
  the add comment form and handle adding coments, and ListComments to list all
  the comments for this post.

  Props:
    postId: <React Router Param Match> Required.
    currentCategory: <Redux State> Required.
    posts: <Redux State> Required.
*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as Constants from '../../utils/constants'
import * as Helpers from '../../utils/helpers'
import * as PostActions from '../actions/postActions'
import AddComment from './AddComment'
import ListComments from './ListComments'
import Viewer from './Viewer'

class ViewPost extends Component {

  static propTypes = {
    posts: PropTypes.object.isRequired,
    currentCategory: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { postId } = this.props.match.params
    this.props.dispatch(PostActions.fetchPost(postId))
  }

  render() {
    const { posts, currentCategory } = this.props
    const { postId } = this.props.match.params

    let sectionTitle
    let post = posts[postId]
    if(!post) {
      sectionTitle = "Post not found"
    } else if(post.deleted) {
      sectionTitle = "Post Deleted"
    } else {
      // If the post exists in the Redux store, store the id into the object we
      // received (it won't have the id in it, since the store contains an id to
      // content mapping). We will pass this object to the Viewer component,
      // which needs the id.
      post.id = postId
      sectionTitle = `${Helpers.capitalize(post.category)}: "${post.title}"`
    }

    return (
      <div>
          <div className="VieWPost">
            <div className="SectionTitle">
              <h2>
                {sectionTitle}
              </h2>
            </div>
            <div className="SectionTitleNav">
              <button>
                <Link
                  to={ `/${currentCategory.path}`}>
                  &lt; Back To {Helpers.capitalize(currentCategory.name)}
                </Link>
              </button>
            </div>
            { post && !post.deleted && (
              <div>
                <Viewer
                  content={post}
                  mode={Constants.CONTENT_MODE_POST}
                />
                <AddComment postId={postId}/>
                <ListComments parentId={postId}/>
              </div>
            )}
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  currentCategory: state.currentCategory
})

export default connect(mapStateToProps)(ViewPost);
