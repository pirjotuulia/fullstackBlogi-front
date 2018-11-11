// let token = null

const blogs = [
  {
    'title': 'React patterns',
    'author': 'Michael Chan',
    'url': 'https://reactpatterns.com/',
    'likes': 9,
    'id': '5b98c02cb3d480e0a80a5ab2'
  },
  {
    'title': 'Go To Statement Considered Harmful',
    'author': 'Edsger W. Dijkstra',
    'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    'likes': 5,
    'id': '5b98c054b3d480e0a80a5ab3'
  },
  {
    'title': 'Canonical string reduction',
    'author': 'Edsger W. Dijkstra',
    'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    'likes': 12,
    'id': '5b98c089b3d480e0a80a5ab4'
  },
  {
    'title': 'First class tests',
    'author': 'Robert C. Martin',
    'url': 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    'likes': 10,
    'id': '5b98c1bdb3d480e0a80a5ab5'
  },
  {
    'title': 'TDD harms architecture',
    'author': 'Robert C. Martin',
    'url': 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    'likes': 2,
    'id': '5b98c1eeb3d480e0a80a5ab6'
  },
  {
    'title': 'Type wars',
    'author': 'Robert C. Martin',
    'url': 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    'likes': 2,
    'id': '5b98c21cb3d480e0a80a5ab7'
  },
  {
    'title': 'Testcase for proptypes',
    'author': 'Joku Muu',
    'url': 'http://erkki.com',
    'likes': 0,
    'id': '5ba08a8a78451edc78e97e87',
    'user': {
      '_id': '5b9a50cae3eccb9595e8e8d5',
      'username': 'jokumuu',
      'name': 'Joku Muu'
    }
  }
]

const getAll = () => {
  console.log('mockissa')
  return Promise.resolve(blogs)
}

export default { getAll, blogs }