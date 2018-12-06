import React from 'react'
import { messageCreation } from '../reducers/notificationReducer'
import { commentCreation } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'

class NewComment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: ''
    }
  }

  handleInputFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  createComment = async (event) => {
    event.preventDefault()
    if (this.state.comment) {
      let createdComment = { comment: this.state.comment }
      this.props.commentCreation(this.props.match.params.id, createdComment)
      this.props.messageCreation(`you added '${createdComment.comment}'`, 5)
      this.setState({ comment: '' })
    } else {
      this.props.messageCreation('there\'s no text in your comment', 5)
    }
    this.props.history.push(`/blogs/${this.props.match.params.id}`)
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.createComment}>
          <div>
            <input
              type="text"
              name="comment"
              value={this.state.comment}
              onChange={this.handleInputFieldChange}
            />
            <button type="submit">add comment</button>
          </div>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    createComment: state.createComment
  }
}

const mapDispatchToProps = {
  messageCreation,
  commentCreation
}

const ConnectedNewComment = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewComment)


export default ConnectedNewComment