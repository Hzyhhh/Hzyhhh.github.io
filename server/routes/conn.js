const mysql = require('mysql')

let connect = mysql.createConnection({
    host:'111.230.243.111',
    user:'root',
    password:'123456',
    database:'beacon',
})

module.exports = connect