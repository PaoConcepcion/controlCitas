const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
<<<<<<< HEAD
    password: 'root',
=======
    password: '',
>>>>>>> 8bfb26aec7c5293892874e05b23412921d1754b8
    database: 'controlcitas'
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