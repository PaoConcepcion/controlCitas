const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const mysqlConnection = require('../../database');

router.get('/employees2', (req, res) => {
    const id_empleado = req.id_empleado;
    mysqlConnection.query(`SELECT * FROM empleados where id_empleado <> ${id_empleado}`, (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.post('/employees', (req, res) => {
    const { id_empleado, id_sucursal, nombre, apellido_paterno, apellido_materno, correo, contrasena, telefono, rol } = req.body;
    const query = 
        'CALL employeesAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ;
    mysqlConnection.query(query, [id_empleado, id_sucursal, nombre, apellido_paterno, apellido_materno, correo, contrasena, telefono, rol], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Employee saved'});
        } else {
            console.log(err);
        }
    });
});

router.put('/employees/:id_empleado', (req, res) => {
    req.body.contrasena = bcrypt.hashSync(req.body.contrasena, 10);
    const { id_sucursal, nombre, apellido_paterno, apellido_materno, correo, contrasena, telefono, rol } = req.body;
    const { id_empleado } = req.params;
    const query = 'CALL employeesAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?, ?)';
    mysqlConnection.query(query, [id_empleado, id_sucursal, nombre, apellido_paterno, apellido_materno, correo, contrasena, telefono, rol], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Employee updated'});
        } else {
            console.log(err);
        }
    });
});

router.put('/deleteEmployee/:id_empleado', (req, res) => {
    const {id_empleado} = req.params;
    const {estatus} = req.body;
    mysqlConnection.query('UPDATE empleados SET estatus = ? WHERE id_empleado = ?', [estatus, id_empleado], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Employee deleted'});
        } else {
            console.log(err);
        }
    });
});

router.put('/changeRol/:id_empleado', (req, res) => {
    const {id_empleado} = req.params;
    const {rol} = req.body;
    mysqlConnection.query('UPDATE empleados SET rol = ? WHERE id_empleado = ?', [rol, id_empleado], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Rol update'});
        } else {
            console.log(err);
        }
    });
}); 

router.get('/employee-name/:nombre', (req, res) => {
    const { nombre } = req.params;
    mysqlConnection.query(`SELECT * FROM empleados WHERE nombre LIKE '%${nombre}%' and estatus = 1`, (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

router.get('/employeesName/:busqueda', (req, res) => {
    const { busqueda } = req.params;
    mysqlConnection.query(`SELECT id_empleado, concat(nombre, ' ' ,apellido_paterno) as nombre FROM empleados WHERE concat(nombre, ' ' , apellido_paterno) like '%${busqueda}%' and estatus = 1;`, (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

module.exports = router;