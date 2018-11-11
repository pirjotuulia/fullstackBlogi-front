import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
  beforeAll(() => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }
    localStorage.setItem('user', JSON.stringify(user))
  })
  it('renders content', () => {
    const blog = {
      title: 'Testing testing',
      author: 'Tester',
      url: 'http://test.com',
      likes: 6
    }

    const blogComponent = shallow(<Blog blog={blog} />)
    const infoDiv = blogComponent.find('.blogentry')
    // console.log(blogComponent.debug())
    // console.log(infoDiv.debug())

    expect(infoDiv.text()).toContain(blog.title)
    expect(infoDiv.text()).toContain(blog.author)
  })
  it('after clicking name the details are displayed', () => {
    const blog = {
      title: 'Testing testing',
      author: 'Tester',
      url: 'http://test.com',
      likes: 6
    }
    const mockHandler = jest.fn()
    const blogComponent = shallow(<Blog blog={blog} onClick={mockHandler} />)

    const nameDiv = blogComponent.find('.namediv')
    // console.log(nameDiv.debug())
    nameDiv.simulate('click')

    const infoDiv = blogComponent.find('.infodiv')
    // console.log(infoDiv.debug())
    expect(infoDiv.text()).toContain(blog.url)
    expect(infoDiv.text()).toContain(blog.likes.toString())
  })
})
