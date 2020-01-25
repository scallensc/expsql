const userRouter = require('express').Router()
const userModel = require('../../models/users')
const mocks = require('../../helpers/mocks')
const sqlite3 = require('sqlite3').verbose()

userRouter.get('/', (req, res, next) => {
    res.body = mocks.createMockUser()
    next()
})

userRouter.use('/mostposts', (req, res, next) => {
    const db = new sqlite3.Database('./src/db/mocks.db', (err) => {
        if (err) {
            console.error(`Error connecting to database: ${err}`)
        }
    })
    let sql = `SELECT U.name AS Username, 
        COUNT(P.author_id) AS PostCount 
        FROM users AS U 
        INNER JOIN posts_authors AS P 
        ON U.id = P.author_id 
        GROUP BY U.name 
        ORDER BY COUNT(p.id) DESC LIMIT 1`;
    db.all(sql, function (err, rows) {
        if (err) {
            console.log(err.message);
        };
        let output = JSON.stringify(rows, null, 4)
        db.close()
        console.table(JSON.parse(output))
        res.send(JSON.parse(output))
        res.end()
    });
});

userRouter.use('/avgposts', (req, res, next) => {
    const db = new sqlite3.Database('./src/db/mocks.db', (err) => {
        if (err) {
            console.error(`Error connecting to database: ${err}`)
        }
    })
    let sql = `SELECT P.author_id,
        AVG(P.author_id) AS PostCount
        FROM posts_authors AS P`
    db.all(sql, function (err, rows) {
        if (err) {
            console.log(err.message);
        };
        let output = JSON.stringify(rows, null, 4)
        db.close()
        console.log(`The average of all posts is: ${rows[0].PostCount}`)
        res.send(`The average of all posts is: ${rows[0].PostCount}`)
        res.end()
    });
});

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
        db.close()
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