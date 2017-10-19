/*
  Readable: components/Viewer.js
  By Chris Leung

  Description:

  Stateless functional React component that renders the content of a post or
  comment. Uses the Controls component to display a group of controls that can
  manipulate the post or comment.

  Props:
    content: <Object> Required. Contains the content of the post or comment. See
      README.md for a description of fields in the post and comment objects.
    mode: <String Constant> Required. Value must be CONTENT_MODE_COMMENT if
      being to render a comment, or CONTENT_MODE_POST if being used to render a
      post.
*/

import React from 'react'
import * as Constants from '../../utils/constants'
import Controls from './Controls'
import Moment from 'moment'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'

function Viewer (props) {

  const { mode, content } = props

  const { title, author, body, timestamp, voteScore} = content

  // If content is a post, id will contain the post id, and parentId will be
  // undefined. If content is a comment, id will contain the comment id, and
  // parentId will contain the parent posts's id.
  let { id } = content
  const { parentId } = content

  // If we are viewing a comment, then we will need to set the comment id here
  let commentId
  if(mode === Constants.CONTENT_MODE_COMMENT) {
    commentId = id
    id = parentId
  }

  return (
    <div className="Viewer">
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              Author
            </Table.Cell>
            <Table.Cell>
              {author}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              Body
            </Table.Cell>
            <Table.Cell>
              {body}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              Date
            </Table.Cell>
            <Table.Cell>
              {Moment(timestamp, "x").format(Constants.DATE_FORMAT_DISPLAY)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              Votes
            </Table.Cell>
            <Table.Cell>
              {voteScore}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              Controls
            </Table.Cell>
            <Table.Cell>
              <Controls
                postId={id}
                commentId={commentId}
                title={title}
                mode={mode}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}

Viewer.propTypes = {
  content: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
}

export default Viewer;
