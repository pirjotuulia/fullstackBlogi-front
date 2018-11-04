import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  if (action.type === 'LIKE') {
    const blogs = state
    const old = blogs.filter(b => b.id !== action.data.id)
    return [...old, action.data]
  }
  if (action.type === 'CREATE') {
    let newBlog = action.data
    return [...state, newBlog]
  }
  if (action.type === 'UPDATE') {
    const blogs = state
    const old = blogs.filter(b => b.id !== action.data.id)
    return [...old, action.data]
  }
  if (action.type === 'INIT_BLOGS') {
    return action.data
  }
  if (action.type === 'DELETE') {
    const blogs = state
    const remaining = blogs.filter(b => b.id !== action.data)
    return remaining
  }
  return state
}

export const blogCreation = (data) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(data)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const commentCreation = (blogId, data) => {
  return async (dispatch) => {
    const blogCommented = await blogService.createComment(blogId, data)
    dispatch({
      type: 'UPDATE',
      data: blogCommented
    })
  }
}

export const likeCreation = (data) => {
  return async (dispatch) => {
    await blogService.update(data.id, data)
    dispatch({
      type: 'LIKE',
      data: data
    })
  }
}

export const blogInitialization = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const blogDelete = (data) => {
  return async (dispatch) => {
    await blogService.deleteBlog(data)
    dispatch({
      type: 'DELETE',
      data: data
    })
  }
}

export default blogReducer