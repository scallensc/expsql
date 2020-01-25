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
                    Visit <a href="/export">/export</a> to export the information in the database to JSON
                    </br> Files will be located in "/data"
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