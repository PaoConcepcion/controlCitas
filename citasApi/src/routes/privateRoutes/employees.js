const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const middleware = require('../middleware');
const middlewareAdmin = require('../middleware_admin');

router.use(middleware.checkToken);

const mysqlConnection = require('../../database');

router.post('/employees', (req, res) => {
    const { id_empleado, id_sucursal, nombre, apellido_paterno, apellido_materno, correo, contrasena, telefono, rol } = req.body;
    const query = `
        CALL employeesAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
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

router.delete('/employees/:id_empleado', (req, res) => {
    const {id_empleado} = req.params;
    mysqlConnection.query('DELETE FROM empleados WHERE id_empleado = ?', [id_empleado], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Employee deleted'});
        } else {
            console.log(err);
        }
    });
}); 

module.exports = router;