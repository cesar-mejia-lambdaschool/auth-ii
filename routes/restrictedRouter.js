const router = require('express').Router()

//* Local Middleware
const validateUser = require('../middleware/validateUser')

router.get('/', validateUser, (req, res, next) => {
  console.log('REQ SESSION \n', req.session)
  res.status(200).json({ msg: 'let us party 🎉 ' })
})

module.exports = router
