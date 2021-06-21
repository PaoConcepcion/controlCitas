const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../database');

router.get('/datesEmployee/:id_empleado', (req, res) => {
    mysqlConnection.query(`select citas.id_cita, citas.fecha, citas.hora_entrada, citas.hora_salida
    from citas, empleados_servicios 
    where citas.id_empleado_servicio = empleados_servicios.id_empleado_servicio
    and empleados_servicios.id_empleado = ${req.params.id_empleado};`, (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

module.exports = router;