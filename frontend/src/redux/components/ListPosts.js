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
    categoryName: <String> Required. A category name (identical to one set in
      the API server's api-server/categories.js file) whose posts we will list.
    categoryPath: <String> Required. A category path (identical to that set in
      the API server's api-server/categories.js file, and from the same tuple
      that contains the category name) whose posts we will list.
    posts: <Redux State> Required. Convert the state object to an array for
      output convenience.
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
    sortVotesArrowStyle: Constants.CSS_CLASS_ARROW_DOWN,
    sortNumCommentsArrowStyle: Constants.CSS_CLASS_ARROW_NONE
  }

  toggleSort(newSortField) {
    const { sortField, sortAscending } = this.state

    let newSortProperties = Helpers.generateNewSortProperties(sortField,sortAscending,newSortField)

    this.setState({
      sortMethod: newSortProperties.method,
      sortAscending: newSortProperties.ascending,
      sortField: newSortField,
      sortVotesArrowStyle: newSortProperties.votesArrowStyle,
      sortDateArrowStyle: newSortProperties.dateArrowStyle,
      sortNumCommentsArrowStyle: newSortProperties.numCommentsArrowStyle
    })
  }

  componentDidMount() {
    const { categoryName, categoryPath, dispatch } = this.props

    // Set currentCategory state
    dispatch(CategoryActions.setCurrentCategory(categoryName, categoryPath))

    if(categoryName === Constants.DEFAULT_CATEGORY_NAME) {
      // If we are in the default category, then no category has been specified
      // and we need to get ALL posts from the backend API server
      dispatch(PostActions.fetchAllPostsAndComments())
    } else {
      // Category has been specified; retrieve posts only for this category
      dispatch(PostActions.fetchCategoryPostsAndComments(categoryName))
    }
  }

  render() {
    const { categoryName, numCommentsForPost } = this.props
    let { posts } = this.props

    // Add property to each post that contains its number of comments
    posts.forEach(post => {
      const numComments = numCommentsForPost[post.id]
      post.numComments = numComments ? numComments : 0
    })

    const postsToDisplay = Helpers.filterAndSortPosts(posts,categoryName,this.state.sortMethod)
    const numPosts = postsToDisplay.length

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
                <Table.HeaderCell
                  className="sortableHeader"
                  onClick={() => this.toggleSort(Constants.LIST_POSTS_SORT_FIELD_NUMCOMMENTS)}>
                  <div className="sortableHeaderLabel">
                    Comments
                  </div>
                  <div className={this.state.sortNumCommentsArrowStyle}/>
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
                      id={post.id}
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
