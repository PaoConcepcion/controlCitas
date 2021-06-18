const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../database');

router.get('/branchOffices', (req, res) => {
    mysqlConnection.query('SELECT * FROM sucursales', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/branchOffices/:id_sucursal', (req, res) => {
    const { id_sucursal } = req.params;
    mysqlConnection.query('SELECT * FROM sucursales WHERE id_sucursal = ?', [id_sucursal], (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
});

module.exports = router;