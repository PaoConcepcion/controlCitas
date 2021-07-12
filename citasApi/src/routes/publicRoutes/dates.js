const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../database');

router.get('/datesEmployeeDay/:id_empleado/:dia', (req, res) => {
    const {id_empleado, dia} = req.params;
    mysqlConnection.query(`select citas.hora_entrada, citas.hora_salida
        from citas, empleados_servicios 
        where citas.id_empleado_servicio = empleados_servicios.id_empleado_servicio
        and citas.fecha = '${dia}'
        and empleados_servicios.id_empleado = ${id_empleado};`, (err, rows, fields) => {
            if(!err){
                res.json(rows);
            } else {
                console.log(err);
            }
    });
});

module.exports = router;