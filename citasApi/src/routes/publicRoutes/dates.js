const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../database');

router.get('/datesEmployeeDay/:id_empleado/:dia', (req, res) => {
    const {id_empleado, dia} = req.params;
    mysqlConnection.query(`select citas.hora_entrada, citas.hora_salida
        from citas, empleados_servicios 
        where citas.id_empleado_servicio = empleados_servicios.id_empleado_servicio
        and citas.fecha = '${dia}'
        and empleados_servicios.id_empleado = ${id_empleado}
        order by citas.hora_entrada;`, (err, rows, fields) => {
            if(!err){
                res.json(rows);
            } else {
                console.log(err);
            }
    });
});
    
router.get('/dates', (req, res) => {
    mysqlConnection.query('SELECT * FROM citas', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/dates/:id_cita', (req, res) => {
    const { id_cita } = req.params;
    mysqlConnection.query('SELECT * FROM citas WHERE id_cita = ?', [id_cita], (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});

router.post('/dates', (req, res) => {
    const { id_cita, id_empleado_servicio, fecha, hora_entrada, hora_salida } = req.body;
    const query = `
        CALL datesAddOrEdit(?, ?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [id_cita, id_empleado_servicio, fecha, hora_entrada, hora_salida], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Date saved', rows});
        } else {
            console.log(err);
        }
    });
});

module.exports = router;