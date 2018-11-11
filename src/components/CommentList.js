import React from 'react'
import { messageCreation } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class CommentList extends React.Component {

  render() {
    this.props.comments.sort((a, b) => b.likes - a.likes)
    return (
      <ul>
        {this.props.comments && this.props.comments.map(comment =>
          <li className='comment' key={comment.id} id={comment.id} >{comment.comment}</li>)}
      </ul>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    comments: props.comments
  }
}

const mapDispatchToProps = {
  messageCreation
}

const ConnectedCommentList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentList)


export default ConnectedCommentList
