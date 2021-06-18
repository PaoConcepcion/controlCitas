const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../database');

router.get('/news', (req, res) => {
    mysqlConnection.query('SELECT * FROM noticias', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/news/:id_noticia', (req, res) => {
    const { id_noticia } = req.params;
    mysqlConnection.query('SELECT * FROM noticias WHERE id_noticia = ?', [id_noticia], (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});

module.exports = router;