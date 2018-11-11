import React from 'react'
import { messageCreation } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import User from '../components/User'

class UserList extends React.Component {

  render() {
    this.props.users.sort((a, b) => b.blogs.length - a.blogs.length)
    return (
      <div>
        <h2>Users</h2>
        <table className='users'>
          <thead>
            <tr>
              <th>Users</th>
              <th>blogs added</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users && this.props.users.map(user =>
              <User key={user.id} user={user} history={this.props.history} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users,
    history: ownProps.history
  }
}

const mapDispatchToProps = {
  messageCreation
}

const ConnectedUserList = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList)


export default ConnectedUserList
