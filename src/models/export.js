const SqliteJsonExport = require('sqlite-json-export');
const sqlite3 = require('sqlite3');
const exporter = new SqliteJsonExport('./src/db/mocks.db');
const db = new sqlite3.Database('./src/db/mocks.db', (err) => {
    if (err) {
        console.error(`Error connecting to database: ${err}`)
    }
})

function exportData () {
    exporter.save('users', 'data/users.json', (err, data) => {});
    exporter.save('posts', 'data/posts.json', (err, data) => {});
    exporter.save('tags', 'data/tags.json', (err, data) => {});
    exporter.save('posts_authors', 'data/posts_authors.json', (err, data) => {});
    exporter.save('posts_tags', 'data/posts_tags.json', (err, data) => {});
};
db.close()

module.exports = { exportTables }