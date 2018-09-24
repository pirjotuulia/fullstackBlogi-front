const initialState = { message: '' }

const notificationReducer = (store = initialState, action) => {
  if (action.type === 'CREATE_MESSAGE') {
    return { message: action.content }
  }
  if (action.type === 'REMOVE') {
    return initialState
  }

  return store
}

export const messageRemoval = () => {
  return {
    type: 'REMOVE'
  }
}

export const messageCreation = (content, time) => {
  return async (dispatch) => {
    await dispatch({
      type: 'CREATE_MESSAGE',
      content
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE'
      })
    }, time*1000)

  }
}

export default notificationReducer