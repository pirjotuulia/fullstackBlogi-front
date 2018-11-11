import React from 'react'
import { messageCreation } from '../reducers/notificationReducer'
import { likeCreation, blogDelete } from '../reducers/blogReducer'
import { connect } from 'react-redux'

class BlogList extends React.Component {

  handleClick = (event) => {
    this.props.history.push(`/blogs/${event.target.id}`)
  }

  render() {
    this.props.blogs.sort((a, b) => b.likes - a.likes)
    return (
      <div>
        <div>
          {this.props.blogs && this.props.blogs.map(blog =>
            <div className='blogentry' key={blog.id} id={blog.id} onClick={this.handleClick}>{blog.title}</div>)}
          {/* <Blog className='blogs' key={blog.id} blog={blog} addLike={this.addLike} deleteBlog={this.deleteBlog} />)} */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    addLike: state.addLike,
    toggleDetails: state.toggleDetails,
    blogs: state.blogs,
    state: state
  }
}

const mapDispatchToProps = {
  messageCreation,
  likeCreation,
  blogDelete
}

const ConnectedBlogList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)


export default ConnectedBlogList
