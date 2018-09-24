import React from 'react'
import blogService from '../services/blogs'
import { messageCreation } from '../reducers/notificationReducer'
import { blogCreation } from '../reducers/blogReducer'
import { connect } from 'react-redux'

class NewBlog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            author: this.props.user.name,
            url: ''
        }
    }

    handleInputFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    createBlog = async (event) => {
        event.preventDefault()
        if (this.state.title&&this.state.url) {
            let createdBlog = { title: this.state.title, author: this.state.author, url: this.state.url }
            this.props.blogCreation(createdBlog)
            this.props.messageCreation(`you added '${createdBlog.title}'`, 5)
            this.setState({ title: '', url: '' })
        } else {
            this.props.messageCreation(`title or url missing`, 5)
        }
    }
    render() {
        return (
            <div>
                <h2>Create new</h2>
                <form onSubmit={this.createBlog}>
                    <div>
                        Title
                    <input
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleInputFieldChange}
                        />
                    </div>
                    <div>
                        Author
                    <input
                            type="text"
                            name="author"
                            value={this.state.author}
                            onChange={this.handleInputFieldChange}
                        />
                    </div>
                    <div>
                        Url
                    <input
                            type="url"
                            name="url"
                            value={this.state.url}
                            onChange={this.handleInputFieldChange}
                        />
                    </div>
                    <button type="submit">create</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        createBlog: state.createBlog,
    }
}

const mapDispatchToProps = {
    messageCreation,
    blogCreation
}

const ConnectedNewBlog = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewBlog)


export default ConnectedNewBlog