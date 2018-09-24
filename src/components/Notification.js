import React from 'react'
import { connect } from 'react-redux'


class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    const {notification} = this.props
    return (
      <div>
        {notification && <div style={style}>
          {notification}
        </div>
        }</div >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification.message
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification