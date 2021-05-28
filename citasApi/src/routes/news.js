const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

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

router.post('/news', (req, res) => {
    const { id_noticia, titulo, descripcion, imagen } = req.body;
    const query = `
        CALL newsAddOrEdit(?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [id_noticia, titulo, descripcion, imagen], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'New saved'});
        } else {
            console.log(err);
        }
    });
});

router.put('/news/:id_noticia', (req, res) => {
    const { titulo, descripcion, imagen } = req.body;
    const { id_noticia } = req.params;
    const query = 'CALL newsAddOrEdit(?, ?, ?, ?)';
    mysqlConnection.query(query, [id_noticia, titulo, descripcion, imagen], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'New updated'});
        } else {
            console.log(err);
        }
    });
});

router.delete('/news/:id_noticia', (req, res) => {
    const {id_noticia} = req.params;
    mysqlConnection.query('DELETE FROM noticias WHERE id_noticia = ?', [id_noticia], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'New deleted'});
        } else {
            console.log(err);
        }
    });
}); 

module.exports = router;