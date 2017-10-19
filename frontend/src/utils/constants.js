/*
  Readable: utils/constants.js
  By Chris Leung

  Description:

  Contains the string constants used in the Readable app.

*/

export const SITE_TITLE = "My React+Redux Powered Forum"

// Default category path and name that shows all posts
export const DEFAULT_CATEGORY_PATH = ''
export const DEFAULT_CATEGORY_NAME = 'All Posts'

// Date formats used for outputting dates to the user and for validating edited dates
export const DATE_FORMAT_DISPLAY = "MM-DD-YYYY hh:mm A"
export const DATE_FORMAT_EDITOR = "MM-DD-YYYY hh:mm:ss.SSS A"

// URL paths to the addPost and edit components
export const PATH_ADD_POST = "addPost"
export const PATH_EDIT = "edit"

export const ERROR_MESSAGE_CONTENT_NOT_FOUND = "Not found"

// Default values for posts and comment properties
export const DEFAULT_VOTES = 1
export const DEFAULT_DELETED_FLAG = false

// Submit button text used in the Edtor component
export const SUBMIT_BUTTON_TEXT_NEW_POST = "Add Post"
export const SUBMIT_BUTTON_TEXT_EDIT = "Save Changes"
export const SUBMIT_BUTTON_TEXT_NEW_COMMENT = "Add Comment"

// Edit component section titles
export const EDIT_SECTION_TITLE_POST = "Editing Post"
export const EDIT_SECTION_TITLE_COMMENT = "Editing Comment"

// Edit modes for Editor component
export const EDITOR_MODE_ADD_POST = "EDITOR_MODE_ADD_POST"
export const EDITOR_MODE_EDIT_POST = "EDITOR_MODE_EDIT_POST"
export const EDITOR_MODE_ADD_COMMENT = "EDITOR_MODE_ADD_COMMENT"
export const EDITOR_MODE_EDIT_COMMENT = "EDITOR_MODE_EDIT_COMMENT"

// Editor component error messages
export const EDITOR_ERROR_MESSAGE_BLANK_BODY = "Error: Body cannot be blank"
export const EDITOR_ERROR_MESSAGE_BLANK_AUTHOR = "Error: Author cannot be blank"
export const EDITOR_ERROR_MESSAGE_BLANK_TITLE = "Error: Title cannot be blank"
export const EDITOR_ERROR_MESSAGE_INVALID_TIMESTAMP = "Time Stamp must be in a valid date format: MM-DD-YYYY hh:mm:SS.SSS AM/PM"

// Content modes used in Viewer.js and Action.js
export const CONTENT_MODE_POST = "CONTENT_MODE_POST"
export const CONTENT_MODE_COMMENT = "CONTENT_MODE_COMMENT"

// Sorting options for ListPosts component
export const LIST_POSTS_SORT_FIELD_TIMESTAMP = "LIST_POSTS_SORT_FIELD_TIMESTAMP"
export const LIST_POSTS_SORT_FIELD_VOTES = "LIST_POSTS_SORT_FIELD_VOTES"
export const LIST_POSTS_SORT_FIELD_NUMCOMMENTS = "LIST_POSTS_SORT_FIELD_NUMCOMMENTS"

// CSS classes for sorting direction arrow styles
export const CSS_CLASS_ARROW_UP = "arrow-up"
export const CSS_CLASS_ARROW_DOWN = "arrow-down"
export const CSS_CLASS_ARROW_NONE = "arrow-none"

// CSS classes for showing/hiding inputs
export const CSS_CLASS_HIDE = "hidden"
export const CSS_CLASS_SHOW = "visible"
