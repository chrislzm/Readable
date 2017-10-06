import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as Constants from '../../utils/constants'
import Moment from 'moment'
import Actions from './Actions'
import { addNewPost, setCurrentCategory } from '../actions'
import { capitalize } from '../../utils/helpers'
import * as BackendAPI from '../../utils/api'

class ListPosts extends Component {

  filter(postDeleted, postCategory,categoryName) {
    if(postDeleted) return false
    if(categoryName === Constants.ALL_POSTS_CATEGORY_NAME) return true
    return postCategory.toLowerCase() === categoryName.toLowerCase()
  }

  componentDidMount() {
    const { categoryName, categoryPath } = this.props
    this.props.dispatch(setCurrentCategory(categoryName, categoryPath))
    if(categoryName === Constants.ALL_POSTS_CATEGORY_NAME) {
      BackendAPI.getAllPosts().then(posts => {
        for(const post of posts) {
          this.props.dispatch(addNewPost(post))
        }
      })
    } else {
      BackendAPI.getCategoryPosts(categoryName).then(posts => {
        for(const post of posts) {
          this.props.dispatch(addNewPost(post))
        }
      })
    }
  }

  render() {
    const { categoryName, posts} = this.props
    const postsToList = posts.filter(post => this.filter(post.deleted,post.category,categoryName))
    let numPosts = postsToList.length
    return(
      <div className="ListPosts">
        <div className="SectionTitle">
          <h2>{capitalize(categoryName)} ({numPosts})</h2>
          <div className="SectionTitleNav">
            <button>
              <Link to={`/${Constants.ADD_POST_PATH}`}>+ Add New Post</Link>
            </button>
          </div>
        </div>
        { numPosts > 0 && (
        <div className="divTable blueTable">
          <div className="divTableHeading">
            <div className="divTableRow">
              <div className="divTableHead">Category</div>
              <div className="divTableHead">Post Title</div>
              <div className="divTableHead">Date</div>
              <div className="divTableHead">Author</div>
              <div className="divTableHead">Votes</div>
              <div className="divTableHead">Actions</div>

            </div>
          </div>
          <div className="divTableBody">
            { postsToList.map(post => (
              <div className="divTableRow" key={post.id}>
                <div className="divTableCell">{capitalize(post.category)}</div>
                <div className="divTableCell"><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></div>
                <div className="divTableCell">{Moment(post.timestamp, "x").format(Constants.DEFAULT_DATE_FORMAT)}</div>
                <div className="divTableCell">{post.author}</div>
                <div className="divTableCell">{post.voteScore}</div>
                <div className="divTableCell">
                  <Actions
                    postId={post.id}
                    title={post.title}
                    mode={Constants.ACTIONS_POST_MODE}/>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}
        { numPosts == 0 && (
          <div className="StatusMessage">Nothing here yet. Be the first—<Link to={`/${Constants.ADD_POST_PATH}`}>Add a new post!</Link></div>
        )}
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  posts: Object.keys(state.posts).map(id => {
    let post = state.posts[id]
    post.id = id
    return post
  })
})

export default connect(mapStateToProps)(ListPosts);
