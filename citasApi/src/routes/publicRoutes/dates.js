const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../database');

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
    const { id_cita, id_empleado_servicio, fecha, hora_entrada, hora_salida, id_usuario, costo } = req.body;
    const query = `
        CALL datesAddOrEdit(?, ?, ?, ?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [id_cita, id_empleado_servicio, fecha, hora_entrada, hora_salida, id_usuario, costo], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Date saved', rows});
        } else {
            console.log(err);
        }
    });
});

router.put('/dates/:id_cita', (req, res) => {
    const { id_empleado_servicio, fecha, hora_entrada, hora_salida, id_usuario, costo } = req.body;
    const { id_cita } = req.params;
    const query = 'CALL datesAddOrEdit(?, ?, ?, ?, ?, ?, ?)';
    mysqlConnection.query(query, [id_cita, id_empleado_servicio, fecha, hora_entrada, hora_salida, id_usuario, costo], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Date updated', rows});
        } else {
            console.log(err);
        }
    });
});

router.delete('/dates/:id_cita', (req, res) => {
    const {id_cita} = req.params;
    mysqlConnection.query('DELETE FROM citas WHERE id_cita = ?', [id_cita], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Date deleted'});
        } else {
            console.log(err);
        }
    });
}); 

module.exports = router;