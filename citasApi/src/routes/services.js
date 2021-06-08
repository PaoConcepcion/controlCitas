const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

const middleware = require('./middleware');
const middlewareAdmin = require('./middleware_admin');

// router.use(middleware.checkToken);

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

router.post('/services', (req, res) => {
    req.body.estatus = 1;
    const { id_servicio, nombre, descripcion, costo, imagen, estatus } = req.body;
    const query = `
        CALL servicesAddOrEdit(?, ?, ?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [id_servicio, nombre, descripcion, costo, imagen, estatus], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Service saved'});
        } else {
            console.log(err);
        }
    });
});

router.put('/services/:id_servicio', (req, res) => {
    const { nombre, descripcion, costo, imagen, estatus } = req.body;
    const { id_servicio } = req.params;
    const query = 'CALL servicesAddOrEdit(?, ?, ?, ?, ?, ?)';
    mysqlConnection.query(query, [id_servicio, nombre, descripcion, costo, imagen, estatus], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Service updated'});
        } else {
            console.log(err);
        }
    });
});

router.put('/deleteServices/:id_servicio', (req, res) => {
    const {id_servicio} = req.params;
    const {estatus} = req.body;
    mysqlConnection.query('UPDATE servicios SET estatus = ? WHERE id_servicio = ?', [estatus, id_servicio], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Service deleted'});
        } else {
            console.log(err);
        }
    });
});

module.exports = router;