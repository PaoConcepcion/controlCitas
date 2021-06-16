const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../database');

router.get('/services', (req, res) => {
    mysqlConnection.query('SELECT * FROM servicios;', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/services/:id_servicio', (req, res) => {
    const { id_servicio } = req.params;
    mysqlConnection.query('SELECT * FROM servicios WHERE id_servicio = ?', [id_servicio], (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});

module.exports = router;
