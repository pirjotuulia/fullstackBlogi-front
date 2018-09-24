import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlog from './components/NewBlog';
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import './index.css'

import { blogInitialization } from './reducers/blogReducer'
import { messageCreation } from './reducers/notificationReducer'
import { connect } from 'react-redux'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // blogs: [],
      error: null,
      username: '',
      password: '',
      user: null,
      notification: '',
      loginVisible: ''
    }
  }

  componentDidMount = async () => {
    this.props.blogInitialization()
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username: this.state.username, password: this.state.password })
      this.setState({ username: '', password: '', user })
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (exception) {
      this.setState({ error: 'Username or password not found.', })
      this.props.messageCreation('wrong username or password', 5)
    }
  }

  logout = async (event) => {
    event.preventDefault()
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    blogService.resetToken()
    this.setState({ user: null })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const loginForm = () => {
      return (
        <div className='login'>
          <Togglable buttonLabel="login">
            <LoginForm
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleLoginFieldChange}
              handleSubmit={this.login}
            />
          </Togglable>
        </div>)
    }
    return (
      <div className='all'>
        <h2>Blogs</h2>
        {this.state.user === null && loginForm()}
        {/* {showNotification} */}
        <Notification />
        {this.state.user&& <div>
          <Togglable className='togglableContent' buttonLabel="create new" ref={component => this.newBlog = component}>
            <NewBlog notification={this.handleBlogAddNotification} user={this.state.user} />
          </Togglable>
          <br></br>
          <div className='loggedin'>
            {this.state.user.name} {this.state.user.id} logged in  <button type="submit" onClick={this.logout}>logout</button>
            <br></br>
            <br></br>
            <BlogList />
          </div>
        </div>}
      </div>
    )
  }
}

export default connect(
  null,
  { messageCreation, blogInitialization }
)(App)