import userService from '../services/users'

const userReducer = (state = [], action) => {
  if (action.type === 'CREATE') {
    let newUser = action.data
    return [...state, newUser]
  }
  if (action.type === 'INIT_USERS') {
    return action.data
  }
  if (action.type === 'DELETE') {
    const users = state
    const remaining = users.filter(u => u.id !== action.data)
    return remaining
  }
  return state
}

export const userCreation = (data) => {
  return async (dispatch) => {
    const newUser = await userService.create(data)
    dispatch({
      type: 'CREATE',
      data: newUser
    })
  }
}

export const userInitialization = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const userDelete = (data) => {
  return async (dispatch) => {
    await userService.deleteUser(data)
    dispatch({
      type: 'DELETE',
      data: data
    })
  }
}

export default userReducer