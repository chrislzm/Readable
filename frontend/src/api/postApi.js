/*
  Readable: api/postApi.js
  By Chris Leung

  Description:

  Contains post-related API server methods used in the Readable app. Please see
  the README.md file in the api-server directory for descriptions of these
  methods.

*/

import {
  HEADERS,
  SERVER_URL
} from './apiConstants'

export const addNewPost = (body) => (
  fetch(`${SERVER_URL}/posts`, {
    method: 'POST',
    headers: HEADERS,
    body:JSON.stringify(body)
   })
  .then(res => res.json())
)

export const deletePost = (id) => (
  fetch(`${SERVER_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: HEADERS
   })
  .then(res => res.json())
)

export const editPost = (id,body) => (
  fetch(`${SERVER_URL}/posts/${id}`, {
    method: 'PUT',
    headers: HEADERS,
    body:JSON.stringify(body)
   })
  .then(res => res.json())
)

export const getAllPosts = () => (
  fetch(`${SERVER_URL}/posts`, { headers: HEADERS })
  .then(res => res.json())
)

export const getCategoryPosts = (category) => (
  fetch(`${SERVER_URL}/${category}/posts`, { headers: HEADERS })
  .then(res => res.json())
)

export const getPost = (id) => (
  fetch(`${SERVER_URL}/posts/${id}`, { headers: HEADERS })
  .then(res => res.json())
)

export const voteOnPost = (id,body) => (
  fetch(`${SERVER_URL}/posts/${id}`, {
    method: 'POST',
    headers: HEADERS,
    body:JSON.stringify(body)
   })
  .then(res => res.json())
)
