/*
  Readable: utils/helpers.js
  By Chris Leung

  Description:

  Contains helper functions used throughout the Readable app. This file is
  divided into three sections:

  (1) General Helper Methods: Designed to be used throughout the Readable app
  (2) ListPosts Component Helper Methods: Designed to be used in the ListPosts
        component
  (3) Editor Component Helper Methods: Designed to be used in the Editor
        component
*/

import {
  OPTION_UP_VOTE,
  OPTION_DOWN_VOTE
} from '../api/apiConstants'

import {
  DEFAULT_CATEGORY_NAME,
  DATE_FORMAT_EDITOR,
  CSS_CLASS_SHOW,
  CSS_CLASS_HIDE,
  CSS_CLASS_ARROW_NONE,
  CSS_CLASS_ARROW_DOWN,
  CSS_CLASS_ARROW_UP,
  LIST_POSTS_SORT_FIELD_VOTES,
  LIST_POSTS_SORT_FIELD_TIMESTAMP,
  LIST_POSTS_SORT_FIELD_NUMCOMMENTS
} from './constants'

import Moment from 'moment'

/* (1) General Helper Methods */

// Capitalizes the first letter of a string
export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

// Converts the categories Redux store into an array of category objects (rather
// than a single object with multiple category properties). This is used in the
// mapStateToProps function of both App.js and Editor.js.
export function convertCategoriesToArray(categories) {
  const categoryArray = Object.keys(categories).map(key => (
    {path:key,name:categories[key]}
  ))
  return categoryArray
}

// Converts a comments object into an array of comment objects (rather than
// than a single object with multiple comment properties). This is used in the
// ListComments.js component.
export function convertCommentsToArray(comments,parentId) {
  return Object.keys(comments).reduce((accumulator, commentId) => {
    let comment = comments[commentId]
    comment.parentId = parentId
    accumulator.push(comment)
    return accumulator
  },[])
}

// Converts our Readable vote delta values (1 or -1 signifying upvote or
// downvote) to a valid API vote option
export function convertVoteDeltaToApiOption(delta) {
  if(delta === 1) {
    return OPTION_UP_VOTE
  } else { // delta === -1
    return OPTION_DOWN_VOTE
  }
}

// Generates a pseudo-GUID (global unique identifier) used as a unique id for
// posts and comments. Source: https://stackoverflow.com/a/105074/7602403
export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

/* (2) ListPosts Component Helper Methods */

// Filters out deleted posts and posts not in the current category, then sorts
// using the sortMethod.
export function filterAndSortPosts(posts,categoryName,sortMethod) {
  const filteredPosts = posts.filter(post => postFilter(post,categoryName))
  return filteredPosts.sort(sortMethod)
}

export function postFilter(post, currentCategory) {
  if(post.deleted) return false
  // All posts are shown in the default category
  if(currentCategory === DEFAULT_CATEGORY_NAME) return true
  return post.category.toLowerCase() === currentCategory.toLowerCase()
}

export function sortByDateDescending(a,b) {
  return sortByDate(a,b,-1)
}

export function sortByDateAscending(a,b) {
  return sortByDate(a,b,1)
}

function sortByDate(a,b,ascending) {
  return (a.timestamp - b.timestamp) * ascending
}

export function sortByVotesDescending(a,b) {
  return sortByVotes(a,b,-1)
}

export function sortByVotesAscending(a,b) {
  return sortByVotes(a,b,1)
}

function sortByVotes(a,b,ascending) {
  return (a.voteScore - b.voteScore) * ascending
}

export function sortByNumCommentsDescending(a,b) {
  return sortByNumComments(a,b,-1)
}

export function sortByNumCommentsAscending(a,b) {
  return sortByNumComments(a,b,1)
}

function sortByNumComments(a,b,ascending) {
  return (a.numComments - b.numComments) * ascending
}

export function generateNewSortProperties(oldSortField,oldSortAscending,newSortField) {
  let sortProperties = {}

  // If the sort field hasn't changed, then we are changing sort direction
  if(newSortField === oldSortField) {
    sortProperties.ascending = !oldSortAscending
  } else {
    sortProperties.ascending = oldSortAscending
  }

  // Set sort method and output styles based on the field being sorted
  switch(newSortField) {
    case LIST_POSTS_SORT_FIELD_TIMESTAMP:
    sortProperties.votesArrowStyle = CSS_CLASS_ARROW_NONE
    sortProperties.numCommentsArrowStyle = CSS_CLASS_ARROW_NONE
    if(sortProperties.ascending) {
      sortProperties.method = sortByDateAscending
      sortProperties.dateArrowStyle = CSS_CLASS_ARROW_UP
    } else {
      sortProperties.method = sortByDateDescending
      sortProperties.dateArrowStyle = CSS_CLASS_ARROW_DOWN
    }
    break
    case LIST_POSTS_SORT_FIELD_NUMCOMMENTS:
    sortProperties.votesArrowStyle = CSS_CLASS_ARROW_NONE
    sortProperties.dateArrowStyle = CSS_CLASS_ARROW_NONE
    if(sortProperties.ascending) {
      sortProperties.method = sortByNumCommentsAscending
      sortProperties.numCommentsArrowStyle = CSS_CLASS_ARROW_UP
    } else {
      sortProperties.method = sortByNumCommentsDescending
      sortProperties.numCommentsArrowStyle = CSS_CLASS_ARROW_DOWN
    }
    break
    default:
    case LIST_POSTS_SORT_FIELD_VOTES:
    sortProperties.dateArrowStyle = CSS_CLASS_ARROW_NONE
    sortProperties.numCommentsArrowStyle = CSS_CLASS_ARROW_NONE
    if(sortProperties.ascending) {
      sortProperties.method = sortByVotesAscending
      sortProperties.votesArrowStyle = CSS_CLASS_ARROW_UP
    } else {
      sortProperties.method = sortByVotesDescending
      sortProperties.votesArrowStyle = CSS_CLASS_ARROW_DOWN
    }
  }
  return sortProperties
}

/* (3) Editor Component Helper Methods */

export function populateFieldsForEditPost(postId,postContent) {
  let prePopulatedFields = {}
  prePopulatedFields.id = postId
  prePopulatedFields.title = postContent.title
  prePopulatedFields.body = postContent.body
  prePopulatedFields.author = postContent.author
  prePopulatedFields.category = postContent.category
  prePopulatedFields.timestamp = postContent.timestamp
  return prePopulatedFields
}

export function populateFieldsForEditComment(parentId,commentId,commentContent) {
  let prePopulatedFields = {}
  prePopulatedFields.id = commentId
  prePopulatedFields.parentId = parentId
  prePopulatedFields.body = commentContent.body
  prePopulatedFields.timestamp = Moment(commentContent.timestamp, "x").format(DATE_FORMAT_EDITOR)
  return prePopulatedFields
}

export function populateFieldsForAddComment(parentId) {
  let prePopulatedFields = {}
  prePopulatedFields.parentId = parentId
  return prePopulatedFields
}

export function populateFieldsForAddPost(currentCategory) {
  let prePopulatedFields = {}
  prePopulatedFields.category = currentCategory.name
  return prePopulatedFields
}

export function setFieldVisibilityForEditPost() {
  let inputFieldVisibility = {}
  inputFieldVisibility.author = CSS_CLASS_HIDE
  inputFieldVisibility.category = CSS_CLASS_HIDE
  inputFieldVisibility.timestamp = CSS_CLASS_HIDE
  inputFieldVisibility.title = CSS_CLASS_SHOW
  return inputFieldVisibility
}

export function setFieldVisibilityForEditComment() {
  // Only show timestamp and body when editing a comment
  let inputFieldVisibility = {}
  inputFieldVisibility.timestamp = CSS_CLASS_SHOW
  inputFieldVisibility.category = CSS_CLASS_HIDE
  inputFieldVisibility.title = CSS_CLASS_HIDE
  inputFieldVisibility.author = CSS_CLASS_HIDE
  return inputFieldVisibility
}

export function setFieldVisibilityForAddComment() {
  // Only show author and body when adding a comment
  let inputFieldVisibility = {}
  inputFieldVisibility.author = CSS_CLASS_SHOW
  inputFieldVisibility.category = CSS_CLASS_HIDE
  inputFieldVisibility.title = CSS_CLASS_HIDE
  inputFieldVisibility.timestamp = CSS_CLASS_HIDE
  return inputFieldVisibility
}

export function setFieldVisibilityForAddPost() {
  // Hide timestamp field
  let inputFieldVisibility = {}
  inputFieldVisibility.author = CSS_CLASS_SHOW
  inputFieldVisibility.category = CSS_CLASS_SHOW
  inputFieldVisibility.title = CSS_CLASS_SHOW
  inputFieldVisibility.timestamp = CSS_CLASS_HIDE
  return inputFieldVisibility
}
