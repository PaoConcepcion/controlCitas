const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../database');

router.get('/users_email/:correo', (req, res) => {
    const { correo } = req.params;
    mysqlConnection.query(`SELECT * FROM usuarios WHERE correo = "${correo}"`, (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});

router.get('/users', (req, res) => {
    mysqlConnection.query('SELECT * FROM usuarios', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/users/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;
    mysqlConnection.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario], (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});

router.post('/users', (req, res) => {
    const { id_usuario, nombre, apellido_paterno, apellido_materno, correo, telefono } = req.body;
    const query = `
        CALL usersAddOrEdit(?, ?, ?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [id_usuario, nombre, apellido_paterno, apellido_materno, correo, telefono], (err, rows, fields) => {
        if(!err) {
            res.json({rows});
        } else {
            console.log(err);
        }
    });
});

router.put('/users/:id_usuario', (req, res) => {
    const { nombre, apellido_paterno, apellido_materno, correo, telefono } = req.body;
    const { id_usuario } = req.params;
    const query = 'CALL usersAddOrEdit(?, ?, ?, ?, ?, ?)';
    mysqlConnection.query(query, [id_usuario, nombre, apellido_paterno, apellido_materno, correo, telefono], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'User updated'});
        } else {
            console.log(err);
        }
    });
});

router.delete('/users/:id_usuario', (req, res) => {
    const {id_usuario} = req.params;
    mysqlConnection.query('DELETE FROM usuarios WHERE id_usuario = ?', [id_usuario], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'user deleted'});
        } else {
            console.log(err);
        }
    });
}); 

module.exports = router;