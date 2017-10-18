/*
  Readable: api/categoryApi.js
  By Chris Leung

  Description:

  Contains category-related API server methods used in the Readable app. Please
  see the README.md file in the api-server directory for descriptions of these
  methods.

*/
import {
  HEADERS,
  SERVER_URL
} from './apiConstants'

export const getCategories = () => (
  fetch(`${SERVER_URL}/categories`, { headers: HEADERS })
  .then(res => res.json())
  .then(data => data.categories)
)
