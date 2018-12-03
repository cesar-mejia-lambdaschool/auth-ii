const db = require('../data/db')

module.exports = {
  getUsers: (req, res, next) => {
    const { user } = req
    db('users')
      .select('username', 'id', 'department')
      .then(users => {
        res.status(200).json({ users, user })
      })
      .catch(err => res.status(403).json({ message: 'must login', err }))
  }
}
