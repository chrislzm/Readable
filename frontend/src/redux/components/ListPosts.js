import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'moment'
import * as BackendAPI from '../../utils/api'
import * as Constants from '../../utils/constants'
import * as Helpers from '../../utils/helpers'
import * as ReduxStoreActions from '../actions'
import Actions from './Actions'

class ListPosts extends Component {

  state = {
    sortMethod: Helpers.sortByVotesDescending,
    sortAscending: false,
    sortField: Constants.LIST_POSTS_SORT_FIELD_VOTES,
    sortDateArrowStyle: Constants.CSS_CLASS_ARROW_NONE,
    sortVotesArrowStyle: Constants.CSS_CLASS_ARROW_DOWN
  }

  postFilter(postDeleted, postCategory, categoryName) {
    if(postDeleted) return false
    if(categoryName === Constants.DEFAULT_CATEGORY_NAME) return true
    return postCategory.toLowerCase() === categoryName.toLowerCase()
  }

  componentDidMount() {
    const { categoryName, categoryPath } = this.props
    this.props.dispatch(ReduxStoreActions.setCurrentCategory(categoryName, categoryPath))
    if(categoryName === Constants.DEFAULT_CATEGORY_NAME) {
      BackendAPI.getAllPosts().then(posts => {
        for(const post of posts) {
          this.props.dispatch(ReduxStoreActions.addNewPost(post))
        }
      })
    } else {
      BackendAPI.getCategoryPosts(categoryName).then(posts => {
        for(const post of posts) {
          this.props.dispatch(ReduxStoreActions.addNewPost(post))
        }
      })
    }
  }

  toggleSort(sortField) {
    let sortMethod, sortAscending, sortDateArrowStyle, sortVotesArrowStyle

    if(this.state.sortField === sortField) {
      sortAscending = !this.state.sortAscending
    } else {
      sortAscending = this.state.sortAscending
    }

    if(sortField === Constants.LIST_POSTS_SORT_FIELD_TIMESTAMP) {
      sortVotesArrowStyle = Constants.CSS_CLASS_ARROW_NONE
      if(sortAscending) {
        sortMethod = Helpers.sortByDateAscending
        sortDateArrowStyle = Constants.CSS_CLASS_ARROW_UP
      } else {
        sortMethod = Helpers.sortByDateDescending
        sortDateArrowStyle = Constants.CSS_CLASS_ARROW_DOWN
      }
    } else {
      sortDateArrowStyle = Constants.CSS_CLASS_ARROW_NONE
      if(sortAscending) {
        sortMethod = Helpers.sortByVotesAscending
        sortVotesArrowStyle = Constants.CSS_CLASS_ARROW_UP
      } else {
        sortMethod = Helpers.sortByVotesDescending
        sortVotesArrowStyle = Constants.CSS_CLASS_ARROW_DOWN
      }
    }

    this.setState({
      sortMethod,
      sortAscending,
      sortField,
      sortVotesArrowStyle,
      sortDateArrowStyle
    })
  }

  render() {
    const { categoryName, posts} = this.props
    const filteredPosts = posts.filter(post => this.postFilter(post.deleted,post.category,categoryName))
    const sortedPosts = filteredPosts.sort(this.state.sortMethod)

    let numPosts = sortedPosts.length
    return(
      <div className="ListPosts">
        <div className="SectionTitle">
          <h2>{Helpers.capitalize(categoryName)} ({numPosts})</h2>
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
                <div className="divTableHead">Author</div>
                <div className="divTableHead" onClick={() => this.toggleSort(Constants.LIST_POSTS_SORT_FIELD_TIMESTAMP)}>
                  <div className="sortableColumnLabel">Date</div>
                  <div className={this.state.sortDateArrowStyle}></div>
                </div>
                <div className="divTableHead" onClick={() => this.toggleSort(Constants.LIST_POSTS_SORT_FIELD_VOTES)}>
                  <div className="sortableColumnLabel">Votes</div>
                  <div className={this.state.sortVotesArrowStyle}></div>
                </div>
                <div className="divTableHead">Actions</div>
              </div>
            </div>
            <div className="divTableBody">
              { sortedPosts.map(post => (
                <div className="divTableRow" key={post.id}>
                  <div className="divTableCell">{Helpers.capitalize(post.category)}</div>
                  <div className="divTableCell"><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></div>
                  <div className="divTableCell">{post.author}</div>
                  <div className="divTableCell">{Moment(post.timestamp, "x").format(Constants.DISPLAY_DATE_FORMAT)}</div>
                  <div className="divTableCell">{post.voteScore}</div>
                  <div className="divTableCell">
                    <Actions
                      postId={post.id}
                      title={post.title}
                      mode={Constants.ACTIONS_POST_MODE}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        { numPosts === 0 && (
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
