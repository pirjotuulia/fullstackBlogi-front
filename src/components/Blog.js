import React from 'react'
import { messageCreation } from '../reducers/notificationReducer'
import { likeCreation, blogDelete } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import '../index.css'
import CommentList from './CommentList'
import NewComment from './NewComment'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blog: this.blogById()
    }
  }

  deleteBlog = async (event) => {
    this.props.blogDelete(event.target.id)
    this.props.messageCreation('blog deleted', 5)
    this.props.history.push('/blogs')
  }

  handleDelete = (event) => {
    let result = window.confirm(`delete ${this.state.blog.title} by ${this.state.blog.author}?`)
    if (result) {
      this.deleteBlog(event)
    }
  }

  handleLike = (event) => {
    event.preventDefault()
    let updatedBlog = { ...this.state.blog, likes: this.state.blog.likes + 1 }
    this.props.likeCreation(updatedBlog)
    this.props.messageCreation(`you liked '${updatedBlog.title}'`, 5)
  }


  blogById = () => {
    if (!this.props.blogs) {
      console.log('ei ole')
    }
    return this.props.blogs.find(blog => blog.id === this.props.match.params.id)
  }

  render() {
    let blog = this.blogById()
    return (
      <div className="blogentry" >
        <div className='namediv' onClick={this.toggleDetails}>{blog.title} {blog.author}</div>
        <div className='infodiv'>
          <a href={blog.url}>{blog.url}</a><br></br>
          {blog.likes} likes <button onClick={this.handleLike} id={blog.id}>likes</button><br></br>
          added by {blog.author}<br></br>
          {(!blog.user || blog.author === this.props.user.name) && <button id={blog.id} onClick={this.handleDelete}>delete</button>}
          <h2>Comments</h2>
          <NewComment history={this.props.history} match={this.props.match} />
          <CommentList comments={blog.comments} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs
  }
}
const mapDispatchToProps = {
  messageCreation,
  likeCreation,
  blogDelete
}
const ConnectedBlog = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)


export default ConnectedBlog