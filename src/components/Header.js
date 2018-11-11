import React from 'react'
import NewBlog from '../components/NewBlog'
import Notification from '../components/Notification'
import LoginForm from '../components/LoginForm'
import Togglable from '../components/Togglable'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import '../index.css'

import { userInitialization } from '../reducers/userReducer'
import { messageCreation } from '../reducers/notificationReducer'
import { login, logout, loginCheck } from '../reducers/loginReducer'
import { connect } from 'react-redux'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notification: '',
      loginVisible: '',
      username: '',
      password: ''
    }
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  componentDidMount = async () => {
  }

  handleLogin = async (event) => {
    event.preventDefault()
    try {
      const data = { username: this.state.username, password: this.state.password }
      this.setState({ username: '', password: '' })
      await this.props.login(data)
    } catch (exception) {
      this.setState({ error: 'Username or password not found.', })
      this.props.messageCreation('wrong username or password', 5)
    }
  }

  handleLogout = async (event) => {
    event.preventDefault()
    this.props.logout()
    this.props.history.push('/')
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  toggleVisibility = () => {
    this.newBlog.toggleVisibility()
  }

  render() {
    const { history } = this.props
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
        {!this.props.user && loginForm()}
        <Notification />
        {this.props.user && <div>
          <Togglable className='togglableContent' buttonLabel="create new blog" ref={component => this.newBlog = component}>
            <NewBlog history={history} toggle={this.toggleVisibility} user={this.props.user} />
          </Togglable>
          <br></br>
        </div>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    handleLogout: state.handleLogout,
    handleLogin: state.handleLogin
  }
}
const mapDispatchToProps = {
  login, logout, loginCheck, messageCreation, userInitialization
}
const HeaderWithRouter = withRouter(Header)

const ConnectedHeader = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderWithRouter))

export default ConnectedHeader