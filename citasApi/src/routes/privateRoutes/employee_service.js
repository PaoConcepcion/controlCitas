const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../database');

router.post('/employee_service', (req, res) => {
    const { id_empleado_servicio, id_empleado, id_servicio } = req.body;
    const query = `
        CALL employeeServiceAddOrEdit(?, ?, ?);
    `;
    mysqlConnection.query(query, [id_empleado_servicio, id_empleado, id_servicio], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Employee-service saved'});
        } else {
            console.log(err);
        }
    });
});

router.put('/employee_service/:id_empleado_servicio', (req, res) => {
    const { id_empleado, id_servicio } = req.body;
    const { id_empleado_servicio } = req.params;
    const query = 'CALL employeeServiceAddOrEdit(?, ?, ?)';
    mysqlConnection.query(query, [id_empleado_servicio, id_empleado, id_servicio], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Employee-service updated'});
        } else {
            console.log(err);
        }
    });
});

router.delete('/employee_service/:id_empleado_servicio', (req, res) => {
    const {id_usuario} = req.params;
    mysqlConnection.query('DELETE FROM empleados_servicios WHERE id_empleado_servicio = ?', [id_usuario], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Employee-service deleted'});
        } else {
            console.log(err);
        }
    });
});

module.exports = router;