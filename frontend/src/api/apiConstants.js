/*
  Readable: api/apiConstants.js
  By Chris Leung

  Description:

  Contains constants used for API method calls in the Readable app.
*/

export const SERVER_URL = 'http://localhost:3001'

// Headers used for all fetch requests
export const HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'whatever-you-want'
}

// Valid parameter values for methods used to vote on posts and comments
export const OPTION_UP_VOTE = 'upVote'
export const OPTION_DOWN_VOTE = 'downVote'
