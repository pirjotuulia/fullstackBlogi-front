import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlog from './components/NewBlog';
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import './index.css'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      error: null,
      username: '',
      password: '',
      user: null,
      notification: '',
      loginVisible: ''
    }
  }

  componentDidMount() {
    console.log('Appissä')
    blogService.getAll().then(blogs =>
      this.setState({ blogs }))
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
      this.handleSignInErrorNotification()
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
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

  handleBlogAddNotification = (blog) => {
    let message = `a new blog ${blog.title} by ${blog.author} added`
    this.setState({ notification: message })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 5000)
    blogService.getAll().then(blogs =>
      this.setState({ blogs }))
    this.newBlog.toggleVisibility()
  }

  handleSignInErrorNotification = () => {
    let message = 'wrong username or password'
    this.setState({ notification: message })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 5000)
  }

  deleteBlog = async (event) => {
    let deleted = await blogService.deleteBlog(event.target.id)
    blogService.getAll().then(blogs =>
      this.setState({ blogs }))
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
    this.state.blogs.sort((a, b) => b.likes - a.likes)
    const showNotification =
      this.state.notification ?
        <Notification message={this.state.notification} /> : <div></div>
    return (
      <div className='all'>
        <h2>blogs</h2>
        <br></br>
        {this.state.user === null && loginForm()}
        {showNotification}
        {this.state.user !== null && <div>
          <Togglable className='togglableContent' buttonLabel="create new" ref={component => this.newBlog = component}>
            <NewBlog notification={this.handleBlogAddNotification} user={this.state.user} />
          </Togglable>
          <br></br>
          <div className='loggedin'>
            {this.state.user.name} {this.state.user.id} logged in  <button type="submit" onClick={this.logout}>logout</button>
            <br></br>
            <br></br>
            {this.state.blogs && this.state.blogs.map(blog =>
              <Blog className='blogs' key={blog.id} deleteBlog={this.deleteBlog} blog={blog}/>)}
          </div>
        </div>}
      </div>
    )
  }
}

export default App;
