import React from 'react'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'
import Home from './components/Home'
import Header from './components/Header'
import Blog from './components/Blog'
import { login, logout } from './reducers/loginReducer'
import { messageCreation } from './reducers/notificationReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './index.css'
import { connect } from 'react-redux'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      notification: '',
      loginVisible: ''
    }
  }

  handleLogout = async (event) => {
    event.preventDefault()
    this.props.logout()
  }

  render() {
    return (
      <div>
        <h2>Blog App</h2>
        <Router>
          <div>
            {(this.props.user || window.localStorage.getItem('user')) && <div>
              <Link to="/">Home</Link> &nbsp;
              <Link to="/blogs">Blogs</Link> &nbsp;
              <Link to="/users">Users</Link> &nbsp;
              <i>{this.props.user.name} logged in. </i> <button type="submit" onClick={this.handleLogout}>logout</button>
            </div>}
            <Header history={this.props.history} />
            <Route exact path="/" render={({ history }) => <Home history={history} />} />
            {(this.props.user || window.localStorage.getItem('user')) && <div>
              <Route exact path="/blogs" render={({ history }) => <BlogList history={history} />} />
              <Route path="/blogs/:id" render={({ history, match }) => <Blog match={match} history={history} />} />
              <Route exact path="/users" render={({ history }) => <UserList history={history} />} />
              <Route path="/users/:id" render={({ history, match }) => <UserDetails match={match} history={history} />} />
            </div>}
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    state
  }
}

const mapDispatchToProps = {
  login, logout, messageCreation
}

export default connect(
  mapStateToProps, mapDispatchToProps)(App)