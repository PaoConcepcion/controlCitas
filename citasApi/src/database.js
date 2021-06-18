const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: '34.68.233.80',
    user: 'root',
    password: '',
    database: 'controlcitas',
    port: 3306
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