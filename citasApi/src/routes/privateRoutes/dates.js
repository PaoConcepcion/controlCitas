const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../database');

router.get('/datesEmployee', (req, res) => {
    const id_empleado = req.id_empleado;
    mysqlConnection.query(`select citas.id_cita, citas.fecha, citas.hora_entrada, citas.hora_salida, 
        concat(servicios.nombre, '  -> Cliente: ', usuarios.nombre, ' ', usuarios.apellido_paterno, ' ', correo, ' ', telefono) as nombre
        from citas, empleados_servicios, servicios, usuarios
        where citas.id_empleado_servicio = empleados_servicios.id_empleado_servicio
        and citas.id_usuario = usuarios.id_usuario
        and empleados_servicios.id_servicio = servicios.id_servicio
        and empleados_servicios.id_empleado = ${id_empleado};`, (err, rows, fields) => {
            if(!err){
                res.json(rows);
            } else {
                console.log(err);
            }
    });
});

router.get('/datesEmployee/:id_empleado', (req, res) => {
    const id_empleado = req.params;
    mysqlConnection.query(`select citas.id_cita, citas.fecha, citas.hora_entrada, citas.hora_salida, 
        concat(servicios.nombre, '  -> Cliente: ', usuarios.nombre, ' ', usuarios.apellido_paterno, ' ', correo, ' ', telefono) as nombre
        from citas, empleados_servicios, servicios, usuarios
        where citas.id_empleado_servicio = empleados_servicios.id_empleado_servicio
        and citas.id_usuario = usuarios.id_usuario
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