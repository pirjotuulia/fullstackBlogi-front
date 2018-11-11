import React from 'react'
import { BrowserRouter as NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { login, logout } from '../reducers/loginReducer'
import { messageCreation } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class Navigation extends React.Component {

  handleLogout = async (event) => {
    event.preventDefault()
    this.props.logout()
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        {(this.props.user) && <div className='loggedin'>
          <NavLink to="/">Home</NavLink> &nbsp;
          <NavLink to="/blogs">Blogs</NavLink> &nbsp;
          <NavLink to="/users">Users</NavLink>
          <span>{this.props.user.name} {this.props.user.id} logged in  <button type="submit" onClick={this.handleLogout}>logout</button></span>
        </div>}
      </div>
    )
  }
}

const mapDispatchToProps = {
  login, logout, messageCreation
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const NavigationWithRouter = withRouter(Navigation)

const ConnectedNavigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationWithRouter)

export default ConnectedNavigation