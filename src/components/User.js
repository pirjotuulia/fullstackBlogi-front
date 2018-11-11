import React from 'react'
import { connect } from 'react-redux'
import '../index.css'

class User extends React.Component {

  render() {
    return (
      <tr className="user">
        <td><a href={`/users/${this.props.thisUser.id}`}>{this.props.thisUser.name}</a></td>
        {this.props.blogs && <td>{this.props.blogs.length}</td>}
      </tr>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    thisUser: ownProps.user,
    blogs: ownProps.user.blogs,
    history: ownProps.history
  }
}

const ConnectedUser = connect(
  mapStateToProps
)(User)


export default ConnectedUser