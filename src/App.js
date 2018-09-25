import React from 'react'
import blogService from './services/blogs'
import userService from './services/users'
import NewBlog from './components/NewBlog';
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import './index.css'

import { blogInitialization } from './reducers/blogReducer'
import { userInitialization } from './reducers/userReducer'
import { messageCreation } from './reducers/notificationReducer'
import { login, logout } from './reducers/loginReducer'
import { connect } from 'react-redux'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // blogs: [],
      error: null,
      username: '',
      password: '',
      notification: '',
      loginVisible: ''
    }
  }

  componentDidMount = async () => {
    this.props.blogInitialization()
    if (this.props.user) {
      blogService.setToken(this.props.user.token)
    }
  }

  handleLogin = async (event) => {
    event.preventDefault()
    try {
      const data = { username: this.state.username, password: this.state.password }
      this.setState({ username: '', password: '' })
      await this.props.login(data)
      blogService.setToken(this.props.user.token)
      userService.setToken(this.props.user.token)
    } catch (exception) {
      this.setState({ error: 'Username or password not found.', })
      this.props.messageCreation('wrong username or password', 5)
    }
  }

  handleLogout = async (event) => {
    event.preventDefault()
    this.props.logout()
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
              handleSubmit={this.handleLogin}
            />
          </Togglable>
        </div>)
    }
    return (
      <div className='all'>
        <h2>Blogs</h2>
        {this.props.user === '' && loginForm()}
        {/* {showNotification} */}
        <Notification />
        {this.props.user && <div>
          <Togglable className='togglableContent' buttonLabel="create new" ref={component => this.newBlog = component}>
            <NewBlog notification={this.handleBlogAddNotification} user={this.props.user} />
          </Togglable>
          <br></br>
          <div className='loggedin'>
            {this.props.user.name} {this.props.user.id} logged in  <button type="submit" onClick={this.handleLogout}>logout</button>
            <br></br>
            <br></br>
            <BlogList />
            <UserList />
          </div>
        </div>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    handleLogout: state.handleLogout,
    handleLogin: state.handleLogin,
  }
}

export default connect(
  mapStateToProps,
  { login, logout, messageCreation, blogInitialization, userInitialization }
)(App)