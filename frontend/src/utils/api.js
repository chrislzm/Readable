const api = "http://localhost:3001"

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'whatever-you-want'
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
  .then(data => data.posts)
)

export const addNewPost = (body) => {
  fetch(`${api}/posts`, {
    method: 'POST',
    headers,
    body:JSON.stringify(body)
   })
  .then(res => res.json())
}

export const editPost = (id,body) => {
  fetch(`${api}/posts/${id}`, {
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
