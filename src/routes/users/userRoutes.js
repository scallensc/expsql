const userRouter = require('express').Router()
const userModel = require('../../models/users')
const mocks = require('../../helpers/mocks')
const sqlite3 = require('sqlite3').verbose()

userRouter.get('/', (req, res, next) => {
    res.body = mocks.createMockUser()
    next()
})

userRouter.use('/:id', (req, res, next) => {
    const db = new sqlite3.Database('./src/db/mocks.db', (err) => {
        if (err) {
            console.error(`Error connecting to database: ${err}`)
        }
    })
    const userId = parseInt(req.params.id);
    db.all(`SELECT * FROM users WHERE id =$1`, userId, function (err, rows) {
        if (err) {
            console.log(err.message);
        };
        let output = JSON.stringify(rows, null, 4)
        console.table(JSON.parse(output))
        res.send(JSON.parse(output))
        res.end()
    });
});

userRouter.use((req, res) => {
    userModel.createUserRecord(res.body)
    res.send(res.body)
})

module.exports = userRouter