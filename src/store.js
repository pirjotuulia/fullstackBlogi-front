import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogService from './services/blogs'
import blogReducer, { blogInitialization } from './reducers/blogReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer
})
const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

blogService.getAll().then(blogs => {
    console.log(blogs)
    store.dispatch(blogInitialization(blogs))
})
export default store