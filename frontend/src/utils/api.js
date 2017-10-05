const api = "http://localhost:3001"

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'whatever-you-want'
}

export const deletePost = (id) => {
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers
   })
  .then(res => res.json())
}

export const getCategories = () => (
  fetch(`${api}/categories`, { headers })
  .then(res => res.json())
  .then(data => data.categories)
)

export const getAllPosts = () => (
  fetch(`${api}/posts`, { headers })
  .then(res => res.json())
)

export const getCategoryPosts = (category) => (
  fetch(`${api}/${category}/posts`, { headers })
  .then(res => res.json())
)

export const getPost = (id) => (
  fetch(`${api}/posts/${id}`, { headers })
  .then(res => res.json())
)

export const getPostComments = (postId) => (
  fetch(`${api}/posts/${postId}/comments`, { headers })
  .then(res => res.json())
)

export const addNewComment = (body) => {
  fetch(`${api}/comments`, {
    method: 'POST',
    headers,
    body:JSON.stringify(body)
   })
  .then(res => res.json())
}

export const addNewPost = (body) => {
  fetch(`${api}/posts`, {
    method: 'POST',
    headers,
    body:JSON.stringify(body)
   })
  .then(res => res.json())
}

export const editComment = (id,body) => {
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers,
    body:JSON.stringify(body)
   })
  .then(res => res.json())
}

export const editPost = (id,body) => {
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers,
    body:JSON.stringify(body)
   })
  .then(res => res.json())
}

export const voteOnComment = (id,body) => {
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers,
    body:JSON.stringify(body)
   })
  .then(res => res.json())
}

export const voteOnPost = (id,body) => {
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers,
    body:JSON.stringify(body)
   })
  .then(res => res.json())
}
