import React, { Component } from 'react'
import Actions from './Actions'
import * as Constants from '../../utils/constants'
import Moment from 'moment'

class Viewer extends Component {

  render() {
    const { title, author, body, timestamp, voteScore} = this.props.content
    let { id, parentId } = this.props.content
    const { mode } = this.props
    let commentId
    if(mode === Constants.ACTIONS_COMMENT_MODE) {
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
            <div className="divTableCell">{Moment(timestamp, "x").format(Constants.DEFAULT_DATE_FORMAT)}</div>
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
}

export default Viewer;