const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
<<<<<<< HEAD
    password: 'Miguel20',
=======
    password: '',
>>>>>>> 5d1748d9b43d78b776f56de93a685835dcc560cd
    database: 'controlcitas',
    port: 3307,
    dateStrings: true
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