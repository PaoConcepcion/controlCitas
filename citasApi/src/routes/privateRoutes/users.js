const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../database');

router.get('/usersName', (req, res) => {
    const { nombre } = req.body;
    mysqlConnection.query(`SELECT id_empleado, concat(nombre, ' ' ,apellido_paterno) as nombre FROM empleados WHERE concat(nombre, ' ' , apellido_paterno) like '%${nombre}%';`, (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

module.exports = router;