import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const loginReducer = (state = '', action) => {
  if (action.type === 'LOGIN') {
    return action.data
  }
  if (action.type === 'LOGOUT') {
    return ''
  }
  return state
}

export const login = (data) => {
  return async (dispatch) => {
    const user = await loginService.login(data)
    dispatch({
      type: 'LOGIN',
      data: user
    })
    blogService.setToken(user.token)
    userService.setToken(user.token)
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT'
    })
    blogService.resetToken()
    userService.resetToken()
  }
}

export const loginCheck = (user) => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export default loginReducer