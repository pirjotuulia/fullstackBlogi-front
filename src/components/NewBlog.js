import React from 'react'
import blogService from '../services/blogs'

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
        try {
            const blog = await blogService.create({ title: this.state.title, author: this.state.author, url: this.state.url })
            this.props.notification(blog)
            this.setState({ title: '', url: '' })

        } catch (exception) {
            this.setState({ error: 'Title or url missing.', })
            setTimeout(() => {
                this.setState({ error: null })
            }, 5000)
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
                            // value={this.state.url}
                            onChange={this.handleInputFieldChange}
                        />
                    </div>
                    <button type="submit">create</button>
                </form>
            </div>
        )
    }
}

export default NewBlog