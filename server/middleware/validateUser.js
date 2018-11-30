require('dotenv').config()

//* Session Based Validation
// const validateUser = (req, res, next) => {
//   if (req.session && req.session.username) {
//     next()
//   } else {
//     res.status(401).json({ message: 'user must login to access resource' })
//   }
// }

const jwt = require('jsonwebtoken')
const util = require('util')

const jwtVerifyAsync = util.promisify(jwt.verify)

async function validateUser (req, res, next) {
  const { token } = req.session
  if (!token) {
    return res.status(401).json({ error: 'you shall not pass!! - no token' })
  }

  try {
    const decodedToken = await jwtVerifyAsync(token, process.env.JWT_SECRET)
    next()
  } catch (err) {
    res
      .status(401)
      .json({ error: 'you  shall not pass!! - token invalid', err })
  }
}

module.exports = validateUser
