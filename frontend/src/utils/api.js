const api = "http://localhost:3001"

const headers = {
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
  .then(data => data.posts)
)

export const getCategoryPosts = (category) => (
  fetch(`${api}/${category}/posts`, { headers })
  .then(res => res.json())
  .then(data => data.posts)
)
