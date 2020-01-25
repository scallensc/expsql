const sqlite3 = require('sqlite3').verbose()

function createUserRecord(userMock) {
    const db = new sqlite3.Database('./src/db/mocks.db', (err) => {
        if (err) {
            console.error(`Error connecting to database: ${err}`)
        }
    })

    const parameters = {
        $user_name: userMock.userName,
        $password: userMock.userPassword,
        $email: userMock.userEmail
    }

    const sql = `
    INSERT INTO users(
        name,
        password,
        email
    ) VALUES (
        $user_name,
        $password,
        $email
    )
    `

    db.serialize(() => {
        db.run(
            sql,
            parameters,
            function (err) {
                if (err) {
                    console.error(err)
                    db.close()
                } else {
                    console.log(parameters)
                    console.log('User saved to DB with id of: ', this.lastID)
                    db.close()
                }
            }
        )
    })
}

module.exports = { createUserRecord }
