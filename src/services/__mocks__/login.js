import axios from 'axios'

const login = async (credentials) => {
    const user = {
            username: 'tester',
            token: '1231231214',
            name: 'Teuvo Testaaja'
          }
    return user
}

export default { login }