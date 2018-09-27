import React from 'react'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'
import Home from './components/Home'
import Header from './components/Header'
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

  render() {
    return (
      <div>
        <Router>
          <div>
            {(this.props.user) && <div>
              <Link to="/">Home</Link> &nbsp;
              <Link to="/blogs">Blogs</Link> &nbsp;
              <Link to="/users">Users</Link>
            </div>}
            <Header history={this.props.history} />
            <Route exact path="/" render={({ history }) => <Home history={history} />} />
            {(this.props.user) && <div>
              <Route path="/blogs" render={() => <BlogList />} />
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
    users: state.users
  }
}

export default connect(
  mapStateToProps, null)(App)