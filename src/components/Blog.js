import React from 'react'
import blogService from '../services/blogs.js'
import '../index.css'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      blog: this.props.blog
    }
  }

  toggleDetails = () => {
    this.setState({ visible: !this.state.visible })
  }

  // componentDidMount = () => {
  //   this.setState(this.state)
  // }

  addLike = async () => {
    let blog = this.state.blog
    blog.likes += 1
    let updatedBlog = await blogService.update(blog.id, blog)
    this.setState({ blog: updatedBlog })
  }

  handleDelete = (event) => {
    let result = window.confirm(`delete ${this.state.blog.title} by ${this.state.blog.author}?`)
    if (result) {
      this.props.deleteBlog(event)
    }
  }

  render() {
    let user = null
    if (window.localStorage) {
      user = JSON.parse(window.localStorage.getItem('user'))
    }
    return (
      <div className="blogentry" >
        <div className='namediv' onClick={this.toggleDetails}>{this.state.blog.title} {this.state.blog.author}</div>
        {this.state.visible && <div className='infodiv'>
          <a href={this.state.blog.url}>{this.state.blog.url}</a><br></br>
          {this.state.blog.likes} likes <button onClick={this.addLike}>likes</button><br></br>
          added by {this.state.blog.author}<br></br>
          {(!this.state.blog.user || this.state.blog.user.username === user.username) && <button id={this.state.blog.id} onClick={this.handleDelete}>delete</button>}
        </div>}
      </div>
    )
  }
}

export default Blog