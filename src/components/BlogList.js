import React from 'react'
import { messageCreation } from '../reducers/notificationReducer'
import { likeCreation, blogDelete } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import Blog from '../components/Blog'

class BlogList extends React.Component {

    deleteBlog = async (event) => {
        this.props.blogDelete(event.target.id)
        this.props.messageCreation(`blog deleted`, 5)
    }

    addLike = async (event) => {
        event.preventDefault()
        let blogLiked = this.props.blogs.filter(b => b.id === event.target.id)[0]
        let updatedBlog = { ...blogLiked, likes: blogLiked.likes + 1 }
        this.props.likeCreation(updatedBlog)
        this.props.blogs.sort((a, b) => b.likes - a.likes)
        this.props.messageCreation(`you liked '${updatedBlog.title}'`, 5)
    }

    render() {
        this.props.blogs.sort((a, b) => b.likes - a.likes)
        return (
            <div>
                {this.props.blogs && this.props.blogs.map(blog =>
                    <Blog className='blogs' key={blog.id} blog={blog} addLike={this.addLike} deleteBlog={this.deleteBlog} />)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addLike: state.addLike,
        toggleDetails: state.toggleDetails,
        blogs: state.blogs,
        deleteBlog: state.deleteBlog
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
