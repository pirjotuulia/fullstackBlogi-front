import React from 'react'
import { mount } from 'enzyme'
import Blog from './components/Blog'
import App from './App'
jest.mock('./services/__mocks__/blogs')
// jest.mock('./services/__mocks__/login')
import blogService from './services/__mocks__/blogs'
// import loginService from './services/__mocks__/login'

describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  describe('when user is not logged', () => {
    beforeEach(() => {
      // luo sovellus siten, että käyttäjä ei ole kirjautuneena
    })

    it('only login form is rendered', () => {
      app.update()
      // const alldiv = app.find('.all')
      // console.log(alldiv.debug())
      // const logindiv = app.find('.login')
      // console.log(logindiv.debug())
      const blogdiv = app.find('.blogs')
      // console.log(blogdiv.debug())
      expect(blogdiv.debug()).toBe('')
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }

      localStorage.setItem('user', JSON.stringify(user))
      // luo sovellus siten, että käyttäjä on kirjautuneena
      app = mount(<App />)
    })

    it('all blogs are rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      // console.log(blogComponents.debug())
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})
