import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogService from './services/blogs'
import userService from './services/users'
import blogReducer, { blogInitialization } from './reducers/blogReducer'
import userReducer, { userInitialization } from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    user: loginReducer,
    users: userReducer
})
const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

blogService.getAll().then(blogs => {
    store.dispatch(blogInitialization(blogs))
})

userService.getAll().then(users => {
    store.dispatch(userInitialization(users))
})
export default store