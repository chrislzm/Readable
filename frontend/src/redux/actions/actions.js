export const ADD_CATEGORY = 'ADD_CATEGORY'

export function addCategory({ name, categories }) {
  return {
    type: ADD_CATEGORY,
    name,
    categories
  }
}
