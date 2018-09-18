import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    it('renders content', () => {
        const blog = {
            title: 'Testing testing',
            author: 'Tester',
            likes: 6
        }

        const blogComponent = shallow(<SimpleBlog blog={blog} />)
        const infoDiv = blogComponent.find('.info')
        // console.log(blogComponent.debug())
        // console.log(infoDiv.debug())

        expect(infoDiv.text()).toContain(blog.title)
        expect(infoDiv.text()).toContain(blog.author)
        expect(infoDiv.text()).toContain(blog.likes.toString())
    })
    it('clicking the button calls event handler once', () => {
        const blog = {
            title: 'Testing testing',
            author: 'Tester',
            likes: 6
        }

        const mockHandler = jest.fn()

        const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')
        expect(mockHandler.mock.calls.length).toBe(2)
    })
})


