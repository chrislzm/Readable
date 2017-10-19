/*
  Readable: components/ListPosts.js
  By Chris Leung

  Description:

  React component that lists all posts for a given category and also updates the
  currentCategory state in the Redux store.

  Several components, such as NavigationBar and AddPost, depend on the
  currentCategory state in order to function correctly. For example: the
  NavigationBar component highlights the current category, and the AddPost
  component pre-selects the current category and uses the currentCategory path
  in a "Back to Category" button link.

  Props:
    categoryName: <String> Required. A category name identical to one set in
      the API server's api-server/categories.js file.
    categoryPath: <String> Required. A category path identical to that set in
      the API server's api-server/categories.js file. Must be from the same
      tuple that contains the category name.
    posts: <Redux State> Required. Convert state object to an array for outputs
      convenience.
    numCommentsForPost: <Redux State> Required. Generate this post-id to
      number-of-comments map from the Redux comments state.
*/

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Controls from './Controls'
import Moment from 'moment'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import * as Constants from '../../utils/constants'
import * as Helpers from '../../utils/helpers'
import * as CategoryActions from '../actions/categoryActions'
import * as PostActions from '../actions/postActions'

class ListPosts extends Component {

  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    categoryPath: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    numCommentsForPost: PropTypes.object.isRequired
  }

  // Set sorting defaults along with corresponding UI widget styles
  state = {
    sortMethod: Helpers.sortByVotesDescending,
    sortAscending: false,
    sortField: Constants.LIST_POSTS_SORT_FIELD_VOTES,
    sortDateArrowStyle: Constants.CSS_CLASS_ARROW_NONE,
    sortVotesArrowStyle: Constants.CSS_CLASS_ARROW_DOWN
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
    Returns:
      Nothing, but updates the component state via setState.
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

  componentDidMount() {
    const { categoryName, categoryPath } = this.props

    // Set currentCategory state
    this.props.dispatch(CategoryActions.setCurrentCategory(categoryName, categoryPath))

    if(categoryName === Constants.DEFAULT_CATEGORY_NAME) {
      // If we are in the default category, then no category has been specified
      // and we need to get ALL posts from the backend API server
      this.props.dispatch(PostActions.fetchAllPostsAndComments())
    } else {
      // Category has been specified; retrieve posts only for this category
      this.props.dispatch(PostActions.fetchCategoryPostsAndComments(categoryName))
    }
  }

  render() {
    const { categoryName, posts, numCommentsForPost } = this.props

    const postsToDisplay = Helpers.filterAndSortPosts(posts,categoryName,this.state.sortMethod)
    const numPosts = postsToDisplay.length

    // Add property to each post that contains its number of comments
    for(let i = 0; i < numPosts; i++) {
      const numComments = numCommentsForPost[postsToDisplay[i].id]
      // If there are no comments, set to 0
      postsToDisplay[i].numComments = numComments ? numComments : 0
    }

    return(
      <div className="ListPosts">
        <div className="SectionTitle">
          <h2>
            {Helpers.capitalize(categoryName)} ({numPosts})
          </h2>
          <div className="SectionTitleNav">
            <button>
              <Link
                to={`/${Constants.PATH_ADD_POST}`}>
                + Add New Post
              </Link>
            </button>
          </div>
        </div>
        { numPosts === 0 && (
          <div className="StatusMessage">
            Nothing here yet. Be the first—
            <Link to={`/${Constants.PATH_ADD_POST}`}>
              Add a new post!
            </Link>
          </div>
        )}
        { numPosts > 0 && (
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  Category
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Post Title
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Author
                </Table.HeaderCell>
                <Table.HeaderCell
                  className="sortableHeader"
                  onClick={() => this.toggleSort(Constants.LIST_POSTS_SORT_FIELD_TIMESTAMP)}>
                  <div className="sortableHeaderLabel">
                    Date
                  </div>
                  <div className={this.state.sortDateArrowStyle}/>
                </Table.HeaderCell>
                <Table.HeaderCell
                  className="sortableHeader"
                  onClick={() => this.toggleSort(Constants.LIST_POSTS_SORT_FIELD_VOTES)}>
                  <div className="sortableHeaderLabel">
                    Votes
                  </div>
                  <div className={this.state.sortVotesArrowStyle}/>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Comments
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Controls
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { postsToDisplay.map(post => (
                <Table.Row key={post.id}>
                  <Table.Cell>
                    {Helpers.capitalize(post.category)}
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/${post.category}/${post.id}`}>
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    {post.author}
                  </Table.Cell>
                  <Table.Cell>
                    {Moment(post.timestamp, "x").format(Constants.DATE_FORMAT_DISPLAY)}
                  </Table.Cell>
                  <Table.Cell>
                    {post.voteScore}
                  </Table.Cell>
                  <Table.Cell>
                    {post.numComments}
                  </Table.Cell>
                  <Table.Cell>
                    <Controls
                      postId={post.id}
                      title={post.title}
                      mode={Constants.CONTENT_MODE_POST}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  // Create array of posts for output convenience
  posts: Object.keys(state.posts).map(id => {
    let post = state.posts[id]
    post.id = id
    return post
  }),
  // Create post-id to number-of-comments map for output convenience
  numCommentsForPost: (() =>{
    let numComments = {}
    for(const id of Object.keys(state.comments)) {
      numComments[id] = Object.keys(state.comments[id]).length
    }
    return numComments
  })()
})

export default connect(mapStateToProps)(ListPosts);
