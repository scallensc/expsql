const exportRouter = require('express').Router()
const exportModel = require('../../models/export')


exportRouter.get('/', (req, res, next) => {
    res.body = exportModel.exportTables()
    next()
})

exportRouter.use((req, res) => {
    exportModel.exportTables(res.body)
    res.send(res.body)
})

module.exports = exportRouter