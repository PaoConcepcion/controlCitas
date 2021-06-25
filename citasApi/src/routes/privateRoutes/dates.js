const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../database');

router.get('/datesEmployee', (req, res) => {
    const id_empleado = req.id_empleado;
    mysqlConnection.query(`select citas.id_cita, citas.fecha, citas.hora_entrada, citas.hora_salida, servicios.nombre
    from citas, empleados_servicios, servicios 
    where citas.id_empleado_servicio = empleados_servicios.id_empleado_servicio
    and empleados_servicios.id_servicio = servicios.id_servicio
    and empleados_servicios.id_empleado = ${id_empleado};`, (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

module.exports = router;