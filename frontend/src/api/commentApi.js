/*
  Readable: api/commentApi.js
  By Chris Leung

  Description:

  Contains comment-related API server methods used in the Readable app. Please
  see the README.md file in the api-server directory for descriptions of these
  methods.

*/
import {
  HEADERS,
  SERVER_URL
} from './apiConstants'

export const addNewComment = (body) => (
  fetch(`${SERVER_URL}/comments`, {
    method: 'POST',
    headers: HEADERS,
    body:JSON.stringify(body)
   })
  .then(res => res.json())
)

export const deleteComment = (id) => (
  fetch(`${SERVER_URL}/comments/${id}`, {
    method: 'DELETE',
    headers: HEADERS
   })
  .then(res => res.json())
)

export const editComment = (id,body) => (
  fetch(`${SERVER_URL}/comments/${id}`, {
    method: 'PUT',
    headers: HEADERS,
    body:JSON.stringify(body)
   })
  .then(res => res.json())
)

export const getAllComments = (postId) => (
  fetch(`${SERVER_URL}/posts/${postId}/comments`, { headers: HEADERS })
  .then(res => res.json())
)

export const getComment = (commentId) => (
  fetch(`${SERVER_URL}/comments/${commentId}`, { headers: HEADERS })
  .then(res => res.json())
)

export const voteOnComment = (id,body) => (
  fetch(`${SERVER_URL}/comments/${id}`, {
    method: 'POST',
    headers: HEADERS,
    body:JSON.stringify(body)
   })
  .then(res => res.json())
)
