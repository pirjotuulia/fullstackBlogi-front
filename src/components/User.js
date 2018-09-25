import React from 'react'
import { connect } from 'react-redux'
import '../index.css'

class User extends React.Component {

    render() {
        return (
            <tr className="user">
                <td>{this.props.user.name}</td>
                {this.props.blogs && <td>{this.props.blogs.length}</td>}
            </tr>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: ownProps.user,
        blogs: ownProps.user.blogs
    }
}

const ConnectedUser = connect(
    mapStateToProps
)(User)


export default ConnectedUser