const userRouter = require('./userController.js')
const authRouter = require('./authController.js')

module.exports = server => {
  server.use('/api/users', userRouter)
  server.use('/auth', authRouter)
}
