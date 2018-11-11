import React from 'react'
import { connect } from 'react-redux'
import '../index.css'

class UserDetails extends React.Component {

  userById = () => {
    return this.props.users.find(user => user.id === this.props.match.params.id)
  }

  render() {
    const user = this.userById()
    return (
      <div>
        <div className="userdetails">
          <h2>{user.name}</h2>
          <h3>Added blogs</h3>
          {user.blogs &&
            <ul>{user.blogs.map(blog => <li key={blog._id}>{blog.title}</li>)}</ul>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    match: ownProps.match,
    users: state.users,
    user: state.user
  }
}

const ConnectedUserDetails = connect(
  mapStateToProps
)(UserDetails)

export default ConnectedUserDetails