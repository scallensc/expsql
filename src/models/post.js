const sqlite3 = require('sqlite3').verbose()

function createPostRecord(postMock) {
    const db = new sqlite3.Database('./src/db/mocks.db', (err) => {
        if (err) {
            console.error(`Error connecting to database: ${err}`)
        }
    })

    db.get(`SELECT * FROM users ORDER BY RANDOM() LIMIT 1`, function (err,row) {
            const userId = row.id
            const parameters = {
            $author_id: userId,
            $post_title: postMock.postTitle,
            $post_text: postMock.postText,
            $post_created: postMock.postCreated
        }

        const sql = `
        INSERT INTO posts(
            author_id,
            title,
            text,
            created_at
        ) VALUES ($author_id, $post_title, $post_text, $post_created)
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
                        console.log('Post saved to DB with id of: ', this.lastID)
                        db.close()
                    }
                }
            )
        })
    })
}

module.exports = { createPostRecord }
