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
    mysqlConnection.query('SELECT * FROM servicios WHERE id_servicio = ? and  estatus = 1', [id_servicio], (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});


router.get('/service-name/:busqueda', (req, res) => {
    const { busqueda } = req.params;
    mysqlConnection.query(`SELECT id_servicio FROM servicios WHERE nombre like '%${busqueda}%' and  estatus = 1`, (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});

router.get('/services-name/:busqueda', (req, res) => {
    const { busqueda } = req.params;
    mysqlConnection.query(`SELECT * FROM servicios WHERE nombre like '%${busqueda}%' and  estatus = 1`, (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

router.get('/active-services', (req, res) => {
    mysqlConnection.query('SELECT id_servicio, nombre, imagen, descripcion FROM servicios where estatus=1;', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

module.exports = router;
