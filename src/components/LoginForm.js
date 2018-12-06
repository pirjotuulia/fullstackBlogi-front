import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => (
  <div>
    <h2>log in to application</h2>
    <Form onSubmit={handleSubmit}>
      <div>
        Username
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">login</button>
    </Form>
  </div>
)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm