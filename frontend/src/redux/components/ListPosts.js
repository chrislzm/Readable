/*
  Readable: components/ListPosts.js
  By Chris Leung

  Description:

  React component that lists all posts for a given category. Passes the content
  of each comment to Viewer.js, which entirely handles the display of each
  comment to the user along with the controls to upvote, downvote, edit and
  delete the comment.

  Props:
    parentId: <String> Required. Contains the id of the parent post whose
      comments we are listing.
    Redux Store State: Mapped to props
*/

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

  // Set defaults for sorting along with corresponding UI widget styles
  state = {
    sortMethod: Helpers.sortByVotesDescending,
    sortAscending: false,
    sortField: Constants.LIST_POSTS_SORT_FIELD_VOTES,
    sortDateArrowStyle: Constants.CSS_ARROW_NONE,
    sortVotesArrowStyle: Constants.CSS_ARROW_DOWN
  }

  /*
    Method: postFilter
    Description: Arrays.prototype.filter() callback method that filters out
      deleted posts and posts that are not in the current category
    Parameters:
      postDeleted: <Boolean> The "deleted" flag property value of a post
        object
      postCategory: <String> The "category" property of a post object
      currentCategory: <String> The current category being viewed by the user
  */
  postFilter(postDeleted, postCategory, currentCategory) {
    if(postDeleted) return false
    if(currentCategory === Constants.DEFAULT_CATEGORY_NAME) return true
    return postCategory.toLowerCase() === currentCategory.toLowerCase()
  }

  /*
    Method: toggleSort
    Description: Toggles sort fields for the ListPosts component. Handles
      everything needed to change the sort field/sort direction, including
      changing the UI styles for the sort arrows.
    Parameters:
      sortField: <String Constant> Use LIST_POSTS_SORT_FIELD_TIMESTAMP for
        sorting by timestamp, or LIST_POSTS_SORT_FIELD_VOTES for sorting by
        votes. (These string constants are stored in utils/constants.js)
  */
  toggleSort(sortField) {
    let sortMethod, sortAscending, sortDateArrowStyle, sortVotesArrowStyle

    // If the sort field hasn't changed, then we are changing sort direction
    if(this.state.sortField === sortField) {
      sortAscending = !this.state.sortAscending
    } else {
      sortAscending = this.state.sortAscending
    }

    // Set sort method and output styles based on the field being sorted
    // If the field is the same as previous,
    if(sortField === Constants.LIST_POSTS_SORT_FIELD_TIMESTAMP) {
      sortVotesArrowStyle = Constants.CSS_ARROW_NONE
      if(sortAscending) {
        sortMethod = Helpers.sortByDateAscending
        sortDateArrowStyle = Constants.CSS_ARROW_UP
      } else {
        sortMethod = Helpers.sortByDateDescending
        sortDateArrowStyle = Constants.CSS_ARROW_DOWN
      }
    } else {
      sortDateArrowStyle = Constants.CSS_ARROW_NONE
      if(sortAscending) {
        sortMethod = Helpers.sortByVotesAscending
        sortVotesArrowStyle = Constants.CSS_ARROW_UP
      } else {
        sortMethod = Helpers.sortByVotesDescending
        sortVotesArrowStyle = Constants.CSS_ARROW_DOWN
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

  componentDidMount() {
    const { categoryName, categoryPath } = this.props

    this.props.dispatch(ReduxStoreActions.setCurrentCategory(categoryName, categoryPath))

    if(categoryName === Constants.DEFAULT_CATEGORY_NAME) {
      // If we are in the default category, then no category has been specified
      // and we get ALL posts from the backend API server
      BackendAPI.getAllPosts().then(posts => {
        for(const post of posts) {
          this.props.dispatch(ReduxStoreActions.addNewPost(post))
        }
      })
    } else {
      // Category has been specified; get posts only for this category
      BackendAPI.getCategoryPosts(categoryName).then(posts => {
        for(const post of posts) {
          this.props.dispatch(ReduxStoreActions.addNewPost(post))
        }
      })
    }
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
              <Link to={`/${Constants.PATH_ADD_POST}`}>+ Add New Post</Link>
            </button>
          </div>
        </div>
        { numPosts === 0 && (
          <div className="StatusMessage">Nothing here yet. Be the first—<Link to={`/${Constants.PATH_ADD_POST}`}>Add a new post!</Link></div>
        )}
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
                  <div className="divTableCell">{Moment(post.timestamp, "x").format(Constants.DATE_FORMAT_DISPLAY)}</div>
                  <div className="divTableCell">{post.voteScore}</div>
                  <div className="divTableCell">
                    <Actions
                      postId={post.id}
                      title={post.title}
                      mode={Constants.ACTIONS_MODE_POST}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
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
