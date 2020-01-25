const postRouter = require('express').Router()
const postModel = require('../../models/posts')
const mocks = require('../../helpers/mocks')

postRouter.get('/', (req, res, next) => {
    res.body = mocks.createMockPost()
    next()
})

postRouter.use((req, res) => {
    postModel.createPostRecord(res.body)
    res.send(res.body)
})

module.exports = postRouter