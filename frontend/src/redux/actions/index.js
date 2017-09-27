export const ADD_CATEGORIES = 'ADD_CATEGORIES'

export function addCategories(newCategories) {
  return {
    type: ADD_CATEGORIES,
    newCategories
  }
}
