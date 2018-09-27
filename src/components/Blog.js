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
    return (
      <div className="blogentry" >
        {this.props.blog&&<div className='namediv' onClick={this.toggleDetails}>{this.props.blog.title} {this.props.blog.author}</div>}
        {this.props.blog&&this.state.visible && <div className='infodiv'>
          <a href={this.props.blog.url}>{this.props.blog.url}</a><br></br>
          {this.props.blog.likes} likes <button onClick={this.handleLike} id={this.props.blog.id}>likes</button><br></br>
          added by {this.props.blog.author}<br></br>
          {(!this.props.blog.user || this.props.blog.author === this.props.user.name) && <button id={this.props.blog.id} onClick={this.handleDelete}>delete</button>}
        </div>}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: ownProps.blog,
    user: state.user
  }
}

const ConnectedBlog = connect(
  mapStateToProps
)(Blog)


export default ConnectedBlog