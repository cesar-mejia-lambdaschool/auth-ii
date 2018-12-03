require('dotenv').config()

const jwt = require('jsonwebtoken')
const util = require('util')

//! Converting async callback-based method to promise-based method
//! util is a built-in node library; no need to npm install

const jwtVerifyAsync = util.promisify(jwt.verify)

//! JWT-in-Cookie Validation
function validateUser (req, res, next) {
  //! Passed automatically by browser if user has LoggedIn/Registered
  const { token } = req.session
  if (!token) {
    return res.status(401).json({ error: 'you shall not pass!! - no token' })
  }

  jwtVerifyAsync(token, process.env.JWT_SECRET)
    //! Must be a valid token to access route handler via next()
    .then(tokenPayload => {
      //! Making available token payload to upcoming handler on req.body
      req.body.payload = tokenPayload
      next()
    })
    .catch(err =>
      res
        .status(401)
        .json({ error: 'you  shall not pass!! - token invalid', err })
    )
}

module.exports = validateUser
