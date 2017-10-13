/*
  Readable: utils/api.js
  By Chris Leung

  Description:

  Contains all API server methods used in the Readable app. Please see the
  README.md file in the api-server directory for descriptions of these methods.

*/

const apiServerURL = "http://localhost:3001"

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'whatever-you-want'
}

/* Category Methods */

export const getCategories = () => (
  fetch(`${apiServerURL}/categories`, { headers })
  .then(res => res.json())
  .then(data => data.categories)
)

export const getCategoryPosts = (category) => (
  fetch(`${apiServerURL}/${category}/posts`, { headers })
  .then(res => res.json())
)

/* Comment Methods */

export const addNewComment = (body) => {
  fetch(`${apiServerURL}/comments`, {
    method: 'POST',
    headers,
    body:JSON.stringify(body)
   })
  .then(res => res.json())
}

export const deleteComment = (id) => {
  fetch(`${apiServerURL}/comments/${id}`, {
    method: 'DELETE',
    headers
   })
  .then(res => res.json())
}

export const editComment = (id,body) => {
  fetch(`${apiServerURL}/comments/${id}`, {
    method: 'PUT',
    headers,
    body:JSON.stringify(body)
   })
  .then(res => res.json())
}

export const getAllComments = (postId) => (
  fetch(`${apiServerURL}/posts/${postId}/comments`, { headers })
  .then(res => res.json())
)

export const getComment = (commentId) => (
  fetch(`${apiServerURL}/comments/${commentId}`, { headers })
  .then(res => res.json())
)

export const voteOnComment = (id,body) => {
  fetch(`${apiServerURL}/comments/${id}`, {
    method: 'POST',
    headers,
    body:JSON.stringify(body)
   })
  .then(res => res.json())
}

/* Post Methods */

export const addNewPost = (body) => {
  fetch(`${apiServerURL}/posts`, {
    method: 'POST',
    headers,
    body:JSON.stringify(body)
   })
  .then(res => res.json())
}

export const deletePost = (id) => {
  fetch(`${apiServerURL}/posts/${id}`, {
    method: 'DELETE',
    headers
   })
  .then(res => res.json())
}

export const editPost = (id,body) => {
  fetch(`${apiServerURL}/posts/${id}`, {
    method: 'PUT',
    headers,
    body:JSON.stringify(body)
   })
  .then(res => res.json())
}

export const getAllPosts = () => (
  fetch(`${apiServerURL}/posts`, { headers })
  .then(res => res.json())
)
export const getPost = (id) => (
  fetch(`${apiServerURL}/posts/${id}`, { headers })
  .then(res => res.json())
)

export const voteOnPost = (id,body) => {
  fetch(`${apiServerURL}/posts/${id}`, {
    method: 'POST',
    headers,
    body:JSON.stringify(body)
   })
  .then(res => res.json())
}
