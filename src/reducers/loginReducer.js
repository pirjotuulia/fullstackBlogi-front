import loginService from '../services/login'

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
    }
}

export const logout = () => {
    return async (dispatch) => {
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export default loginReducer