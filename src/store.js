import { createStore, compose, applyMiddleware } from 'redux'
import { persistCombineReducers, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogService from './services/blogs'
import userService from './services/users'
import blogReducer, { blogInitialization } from './reducers/blogReducer'
import userReducer, { userInitialization } from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'

const config = {
  key: 'primary',
  storage
}

const reducer = persistCombineReducers(config, {
  blogs: blogReducer,
  notification: notificationReducer,
  user: loginReducer,
  users: userReducer
})
const store = createStore(
  reducer,
  undefined,
  compose(
    applyMiddleware(thunk)
  )
)

persistStore(store, null, () => {
  store.getState()
})

blogService.getAll().then(blogs => {
  store.dispatch(blogInitialization(blogs))
})

userService.getAll().then(users => {
  store.dispatch(userInitialization(users))
})
export default store