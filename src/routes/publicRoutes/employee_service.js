const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../database');

router.get('/employee_service', (req, res) => {
    mysqlConnection.query('CALL `controlcitas`.`empployee_services`();', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/employee_service/:id_empleado_servicio', (req, res) => {
    const { id_empleado_servicio } = req.params;
    mysqlConnection.query('SELECT empleados_servicios.id_empleado_servicio, empleados_servicios.id_empleado, empleados.nombre AS nombre_empleado, empleados.apellido_paterno, empleados_servicios.id_servicio, servicios.nombre AS nombre_servicio from empleados_servicios INNER JOIN empleados ON empleados_servicios.id_empleado = empleados.id_empleado INNER JOIN servicios ON empleados_servicios.id_servicio = servicios.id_servicio WHERE id_empleado_servicio = ?', [id_empleado_servicio], (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});

// router.post('/employee_service', (req, res) => {
//     const { id_empleado_servicio, id_empleado, id_servicio } = req.body;
//     const query = `
//         CALL employeeServiceAddOrEdit(?, ?, ?);
//     `;
//     mysqlConnection.query(query, [id_empleado_servicio, id_empleado, id_servicio], (err, rows, fields) => {
//         if(!err) {
//             res.json({Status: 'Employee-service saved'});
//         } else {
//             console.log(err);
//         }
//     });
// });

module.exports = router;