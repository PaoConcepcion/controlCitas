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

router.get('/employees_available/:dia/:servicio/:sucursal', (req, res) => {
    const { dia, servicio, sucursal } = req.params;
    mysqlConnection.query(`select em.id_empleado as id_empleado, concat(em.nombre, ' ', em.apellido_paterno) as nombre
        from empleados em, empleados_servicios es, horarios ho
        where em.id_sucursal = ${sucursal}
            and em.id_empleado = es.id_empleado
            and es.id_servicio = ${servicio}
            and ho.id_empleado = em.id_empleado
            and ho.${dia} = 1
            and em.estatus = 1;`, (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

module.exports = router;