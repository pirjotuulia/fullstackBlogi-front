import React from 'react';
import { BrowserRouter as Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { login, logout } from '../reducers/loginReducer'
import { messageCreation } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { connect } from 'react-redux'

class Navigation extends React.Component {

    handleLogout = async (event) => {
        event.preventDefault()
        this.props.logout()
        blogService.resetToken()
        localStorage.removeItem('user')
        this.props.history.push("/")
    }

    render() {
        return (
            <div>
                {this.props.user && <div className='loggedin'>
                    {this.props.user && <div>
                        <Link to="/">Home</Link> &nbsp;
                        <Link to="/blogs">Blogs</Link> &nbsp;
                        <Link to="/users">Users</Link>
                        {this.props.user.name} {this.props.user.id} logged in  <button type="submit" onClick={this.handleLogout}>logout</button>
                    </div>}
                    {this.props.user.name} {this.props.user.id} logged in  <button type="submit" onClick={this.handleLogout}>logout</button>
                </div>}
            </div>
        )
    }
}

const mapDispatchToProps = {
    login, logout, messageCreation
}
const NavigationWithRouter = withRouter(Navigation)

const ConnectedNavigation = connect(
    null,
    mapDispatchToProps
)(NavigationWithRouter)

export default ConnectedNavigation