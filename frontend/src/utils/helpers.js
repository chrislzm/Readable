/*
  Readable: utils/helpers.js
  By Chris Leung

  Description:

  Contains helper functions used throughout the Readable app.

*/

import { OPTION_UP_VOTE, OPTION_DOWN_VOTE } from '../api/apiConstants'
import { DEFAULT_CATEGORY_NAME } from './constants'

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

export function filterAndSortPosts(posts,categoryName,sortMethod) {
  const filteredPosts = posts.filter(post => postFilter(post.deleted,post.category,categoryName))
  return filteredPosts.sort(sortMethod)
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
  Returns:
    <Boolean>: true if post should be kept, false if post should filtered out
*/
export function postFilter(postDeleted, postCategory, currentCategory) {
  if(postDeleted) return false
  if(currentCategory === DEFAULT_CATEGORY_NAME) return true
  return postCategory.toLowerCase() === currentCategory.toLowerCase()
}

// Sort functions used in ListPosts component that are passed as the
// compareFunction to Arrays.prototype.sort()
export function sortByDateDescending(a,b) {
  return sortByDate(a,b,false)
}

export function sortByDateAscending(a,b) {
  return sortByDate(a,b,true)
}

function sortByDate(a,b,ascending) {
  if((a.timestamp < b.timestamp) ^ ascending) return 1
  if(a.timestamp === b.timestamp) return 0
  if((a.timestamp > b.timestamp) ^ ascending) return -1
}

export function sortByVotesDescending(a,b) {
  return sortByVotes(a,b,false)
}

export function sortByVotesAscending(a,b) {
  return sortByVotes(a,b,true)
}

function sortByVotes(a,b,ascending) {
  if((a.voteScore < b.voteScore) ^ ascending) return 1
  if(a.voteScore === b.voteScore) return 0
  if((a.voteScore > b.voteScore) ^ ascending) return -1
}
