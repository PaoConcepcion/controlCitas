const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    // host: '34.68.233.80',
    // host: 'localhost',
    user: 'root',
    password: 'Miguel20',
    database: 'controlcitas',
    port: 3307
});

mysqlConnection.connect(function(err){
    if(err){
        console.log(err);
        return;
    } else {
        console.log('Db is connected');
    }
});

module.exports = mysqlConnection;