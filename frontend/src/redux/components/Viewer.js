import React, { Component } from 'react'
import PostActions from './PostActions'
import * as Constants from '../../utils/constants'
import Moment from 'moment'

class Viewer extends Component {

  render() {
    const {id, title, author, body, timestamp, voteScore} = this.props.content
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
              <PostActions postId={id} postTitle={title}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Viewer;
