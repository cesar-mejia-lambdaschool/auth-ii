const db = require('../data/db')

module.exports = {
  getUsers: (req, res, next) => {
    console.log(' 🍌', req.session)
    const { user } = req
    db('local')
      .select('id', 'email', 'password')
      .then(users => {
        res.status(200).json({ users, user })
      })
      .catch(err => res.status(403).json({ message: 'must login', err }))
  }
}
