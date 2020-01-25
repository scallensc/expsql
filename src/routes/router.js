const router = require('express').Router()

// router.use 
router.use('/users', require('./users/userRoutes'))
router.use('/posts', require('./posts/postRoutes'))
router.use('/export', require('./export/exportRoutes'))

// Default route returns an HTML document displaying 
// the endpoints for the applications with a list
router.get('/', (req, res) => {
    res.send(`
    <html>
        <head>
            <title>
                Bloggo McBloggington
            </title>
        </head>
        <body>
            <header>
                Bloggos
            </header>
            <section>
                <ul>
                    <li>
                        Visit <a href="/users">/users</a> to generate a new user
                    </li>
                    <li>
                        Visit <a href="/posts">/posts</a> to generate a new post from a random user ID
                    </li>
                    <li>
                        Visit <a href="/export">/export</a> to export ALL the information in the database to JSON
                    </br> Files will be located in "/data"
                    </br></br>
                    <li>
                        Visit <a href="/export/users">/export/users</a> to retrieve ALL info from users table
                    </li>
                    <li>
                        Visit <a href="/export/posts">/export/posts</a> to retrieve ALL info from posts table
                    </li>
                    <li>
                        Visit <a href="/export/tags">/export/tags</a> to retrieve ALL info from tags table
                    </li>
                    <li>
                        Visit <a href="/export/posts_tags">/export/users</a> to retrieve ALL info from posts_tags table
                    </li>
                    <li>
                        Visit <a href="/export/posts_authors">/export/posts_authors</a> to retrieve ALL info from posts_authors table
                    </li>
            </section>
        </body>
    </html>
    `)
})

// `app.all` listens for all HTTP methods, if using this as a
// catch-all, make sure it is the last route that is declared
router.all('*', (req, res) => {
    res.status(404)
    res.send('404 Page not found')
})

module.exports = router