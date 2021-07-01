const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../database');

router.post('/schedules', (req, res) => {
    const { id_horario, id_empleado, lunes, martes, miercoles, jueves,  viernes, sabado, domingo, entrada, salida, descanso_inicio, descanso_fin } = req.body;
    const query = `
        CALL schedulesAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [id_horario, id_empleado, lunes, martes, miercoles, jueves,  viernes, sabado, domingo, entrada, salida, descanso_inicio, descanso_fin], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Schedule saved'});
        } else {
            console.log(err);
        }
    });
});

router.put('/schedules/:id_horario', (req, res) => {
    const { id_empleado, lunes, martes, miercoles, jueves,  viernes, sabado, domingo, entrada, salida, descanso_inicio, descanso_fin } = req.body;
    const { id_horario } = req.params;
    const query = 'CALL schedulesAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
    mysqlConnection.query(query, [id_horario, id_empleado, lunes, martes, miercoles, jueves,  viernes, sabado, domingo, entrada, salida, descanso_inicio, descanso_fin], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Schedule updated'});
        } else {
            console.log(err);
        }
    });
});

router.delete('/schedules/:id_horario', (req, res) => {
    const {id_horario} = req.params;
    mysqlConnection.query('DELETE FROM horarios WHERE id_horario = ?', [id_horario], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Schedule deleted'});
        } else {
            console.log(err);
        }
    });
});

module.exports = router;