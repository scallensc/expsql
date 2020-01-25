const fs = require('fs');
const exportRouter = require('express').Router()

const sqliteJson = require('sqlite-json');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./src/db/mocks.db', (err) => {
    if (err) {
        console.error(`Error connecting to database: ${err}`)
    }
})
exporter = sqliteJson(db);

function exportTables(tableName) {
    exporter.json(`select * FROM ${tableName}`, function (err, json) {
        let data = JSON.parse(json)
        console.table(data)
        let output = JSON.stringify(data, null, 4)
        fs.writeFileSync(`./data/${tableName}.json`, output);
    });
}

exportRouter.get('/', (req, res, next) => {
    let tables = ['users', 'posts', 'tags', 'posts_authors', 'posts_tags'];
    for(let i = 0; i < tables.length; i++){
        exportTables(tables[i])
    }
    next();
})
exportRouter.use((req, res) => {
    res.send('Data exported to "/data/"')
})

module.exports = exportRouter