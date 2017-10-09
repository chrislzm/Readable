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
      // Verify this is an existing post--if it is, it will have data
      if(Object.keys(post).length > 0) {
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
      post.id = postId
      post.category = Helpers.capitalize(post.category)
    }
    return (
      <div>
        { post && !post.deleted && (
          <div className="VieWPost">
            <div className="SectionTitle">
              <h2>{post.category}: "{ post.title }"</h2>
              <div className="SectionTitleNav">
                <button>
                  <Link to={ `/${categoryPath}`}>&lt; Back To {Helpers.capitalize(categoryName)}</Link>
                </button>
              </div>
            </div>
            <Viewer content={post} mode={Constants.ACTIONS_MODE_POST}/>
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
