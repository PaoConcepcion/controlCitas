const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../database');

router.get('/options', (req, res) => {
    mysqlConnection.query('SELECT * FROM opciones', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

module.exports = router;