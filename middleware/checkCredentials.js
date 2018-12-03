const checkCredentials = (req, res, next) => {
  const { email, password } = req.body
  if (!email.trim() || email.length > 50) {
    return next(new Error('email is required (max 50 char)'))
  }
  if (!password.trim() || password.length > 20) {
    return next(new Error('password is required (20 max char)'))
  }

  next()
}

module.exports = checkCredentials
