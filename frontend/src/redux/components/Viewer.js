/*
  Readable: components/Viewer.js
  By Chris Leung

  Description:

  React component that renders the content of a post or comment.

  Props:
    content: <Object> Required. Contains the content of the post or comment. See
      README.md for a description of fields in the post and comment objects.
    mode: <String Constant> Required.
    Redux Store State: Mapped to props
*/

import React from 'react'
import * as Constants from '../../utils/constants'
import Actions from './Actions'
import Moment from 'moment'

function Viewer (props) {
  const { mode, content } = props
  const { title, author, body, timestamp, voteScore} = content
  let { id, parentId } = content

  let commentId
  if(mode === Constants.CONTENT_MODE_COMMENT) {
    commentId = id
    id = parentId
  }
  return (
    <div className="divTable blueTable">
      <div className="divTableBody">
        <div className="divTableRow">
          <div className="divTableLabel">Author</div>
          <div className="divTableCell">{author}</div>
        </div>
        <div className="divTableRow">
          <div className="divTableLabel">Body</div>
          <div className="divTableCell">{body}</div>
        </div>
        <div className="divTableRow">
          <div className="divTableLabel">Date</div>
          <div className="divTableCell">{Moment(timestamp, "x").format(Constants.DATE_FORMAT_DISPLAY)}</div>
        </div>
        <div className="divTableRow">
          <div className="divTableLabel">Votes</div>
          <div className="divTableCell">{voteScore}</div>
        </div>
        <div className="divTableRow">
          <div className="divTableLabel">Actions</div>
          <div className="divTableCell">
            <Actions postId={id} commentId={commentId} title={title} mode={mode}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Viewer;
