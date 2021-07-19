const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../database');

router.get('/schedules', (req, res) => {
    mysqlConnection.query('SELECT * FROM horarios', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/schedules/:id_empleado', (req, res) => {
    const { id_empleado } = req.params;
    mysqlConnection.query('SELECT * FROM horarios WHERE id_empleado = ?', [id_empleado], (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});

router.get('/schedules_hours/:id_empleado', (req, res) => {
    const { id_empleado } = req.params;
    mysqlConnection.query('SELECT entrada, salida, descanso_inicio, descanso_fin FROM horarios WHERE id_empleado = ?', [id_empleado], (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});

module.exports = router;