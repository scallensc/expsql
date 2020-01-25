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
            $post_created: postMock.postCreated,
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
                        //db.close()
                    }
                    const post_id = this.lastID
                    const tag_id = Math.floor((Math.random() * 5) + 1);
                    const sql2 = `INSERT INTO posts_tags(
                        post_id,
                        tag_id
                    ) VALUES ($post_id, $tag_id)
                    `
                    const parameters2 = {
                        $post_id: post_id,
                        $tag_id: tag_id
                    }
                    db.run(
                        sql2,
                        parameters2,
                        function (err) {
                            if (err) {
                                console.error(err)
                                db.close()
                            } else {
                                console.log(`Post tagged with: `)
                                console.log(parameters2)
                            }
                            const sql3 = `INSERT INTO posts_authors(
                                post_id,
                                author_id
                            ) VALUES ($post_id, $author_id)
                            `
                            const parameters3 = {
                                $post_id: parameters2.$post_id,
                                $author_id: parameters.$author_id
                            }
                            db.run(
                                sql3,
                                parameters3,
                                function (err) {
                                    if (err) {
                                        console.error(err)
                                        db.close()
                                    } else {
                                        console.log(`Post author logged with: `)
                                        console.log(parameters3)
                                        db.close()
                                    }
                                }
                            )
                        })
                    })
                })
            })
        }

module.exports = { createPostRecord }
