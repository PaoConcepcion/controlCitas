const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../database');

router.get('/dates_users', (req, res) => {
    mysqlConnection.query('SELECT * FROM citas_usuarios', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/dates_users/:id_cita_usuario', (req, res) => {
    const { id_cita_usuario } = req.params;
    mysqlConnection.query('SELECT * FROM citas_usuarios WHERE id_cita_usuario = ?', [id_cita_usuario], (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});

router.post('/dates_users', (req, res) => {
    const { id_cita_usuario, id_cita, id_usuario, costo } = req.body;
    const query = `
        CALL datesUsersAddOrEdit(?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [id_cita_usuario, id_cita, id_usuario, costo], (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

module.exports = router;