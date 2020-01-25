const userRouter = require('express').Router()
const userModel = require('../../models/users')
const mocks = require('../../helpers/mocks')

userRouter.get('/', (req, res, next) => {
    res.body = mocks.createMockUser()
    next()
})

userRouter.use((req, res) => {
    userModel.createUserRecord(res.body)
    res.send(res.body)
})

module.exports = userRouter