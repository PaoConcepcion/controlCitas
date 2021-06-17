const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../database');

router.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM empleados', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/employees/:id_empleado', (req, res) => {
    const { id_empleado } = req.params;
    mysqlConnection.query('SELECT * FROM empleados WHERE id_empleado = ?', [id_empleado], (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});

module.exports = router;