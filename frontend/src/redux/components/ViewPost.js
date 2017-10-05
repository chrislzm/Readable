import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { capitalize } from '../../utils/helpers'
import ListComments from './ListComments'
import LeaveComment from './LeaveComment'
import Viewer from './Viewer'
import * as Constants from '../../utils/constants'
import { addNewPost } from '../actions'
import * as BackendAPI from '../../utils/api'

class ViewPost extends Component {

  componentDidMount() {
    const { postId } = this.props.match.params
    BackendAPI.getPost(postId).then(post => this.props.dispatch(addNewPost(post)))
  }

  render() {
    const categoryName = this.props.currentCategory.name
    const categoryPath = this.props.currentCategory.path
    const { postId } = this.props.match.params
    let post = this.props.posts[postId]
    if(post) {
      post.id = postId
      post.category = capitalize(post.category)
    }
    return (
      <div>
        { post && (
          <div className="VieWPost">
            <div className="SectionTitle">
              <h2>{post.category}: "{ post.title }"</h2>
              <div className="SectionTitleNav">
                <button>
                  <Link to={ `/${categoryPath}`}>&lt; Back To {capitalize(categoryName)}</Link>
                </button>
              </div>
            </div>
            <Viewer content={post} mode={Constants.ACTIONS_POST_MODE}/>
            <LeaveComment postId={postId}/>
            <ListComments parentId={postId}/>
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
