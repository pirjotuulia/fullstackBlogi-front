import React from 'react'
import blogService from '../services/blogs.js'
import { connect } from 'react-redux'
import '../index.css'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleDetails = () => {
    this.setState({ visible: !this.state.visible })
  }

  handleDelete = (event) => {
    let result = window.confirm(`delete ${this.props.blog.title} by ${this.props.blog.author}?`)
    if (result) {
      this.props.deleteBlog(event)
    }
  }

  handleLike = (event) => {
    this.props.addLike(event)
  }

  render() {
    let user
    if (window.localStorage) {
      user = JSON.parse(window.localStorage.getItem('user'))
    }
    return (
      <div className="blogentry" >
        <div className='namediv' onClick={this.toggleDetails}>{this.props.blog.title} {this.props.blog.author}</div>
        {this.state.visible && <div className='infodiv'>
          <a href={this.props.blog.url}>{this.props.blog.url}</a><br></br>
          {this.props.blog.likes} likes <button onClick={this.handleLike} id={this.props.blog.id}>likes</button><br></br>
          added by {this.props.blog.author}<br></br>
          {(!this.props.blog.user || this.props.blog.author === user.name) && <button id={this.props.blog.id} onClick={this.handleDelete}>delete</button>}
        </div>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const ConnectedBlog = connect(
  mapStateToProps
)(Blog)


export default ConnectedBlog