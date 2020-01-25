const postRouter = require('express').Router()
const postModel = require('../../models/posts')
const mocks = require('../../helpers/mocks')
const sqlite3 = require('sqlite3').verbose()

postRouter.get('/', (req, res, next) => {
    res.body = mocks.createMockPost()
    next()
})

postRouter.use('/:id', (req, res, next) => {
    const db = new sqlite3.Database('./src/db/mocks.db', (err) => {
        if (err) {
            console.error(`Error connecting to database: ${err}`)
        }
    })
    const postId = parseInt(req.params.id);
    db.all(`SELECT * FROM posts WHERE id =$1`, postId, function (err, rows) {
        if (err) {
            console.log(err.message);
        };
        let output = JSON.stringify(rows, null, 4)
        console.table(JSON.parse(output))
        res.send(JSON.parse(output))
        res.end()
    });
});

postRouter.use((req, res) => {
    postModel.createPostRecord(res.body)
    res.send(res.body)
})

module.exports = postRouter