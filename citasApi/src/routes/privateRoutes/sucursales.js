const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../database');

router.post('/sucursales', (req, res) => {
    const { id_sucursal, nombre, telefono, cp, colonia, calle, numero_exterior, numero_interior, latitud, longitud } = req.body;
    const query = 'CALL branchOfficeAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
    mysqlConnection.query(query, [id_sucursal, nombre, telefono, cp, colonia, calle, numero_exterior, numero_interior, latitud, longitud], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Employee saved'});
        } else {
            console.log(err);
        }
    });
});

router.put('/sucursales/:id_sucursal', (req, res) => {
    const { nombre, telefono, cp, colonia, calle, numer_exterior, numero_interior, latitud, longitud } = req.body;
    const { id_sucursal } = req.params;
    const query = 'CALL branchOfficeAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    mysqlConnection.query(query, [id_sucursal, nombre, telefono, cp, colonia, calle, numer_exterior, numero_interior, latitud, longitud], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Employee updated'});
        } else {
            console.log(err);
        }
    });
});


router.delete('/deleteSucursal/:id_sucursal', (req, res) => {
    const {id_sucursal} = req.params;
    mysqlConnection.query('DELETE FROM sucursales WHERE id_sucursal = ?', [id_sucursal], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Employee deleted'});
        } else {
            console.log(err);
        }
    });
});

module.exports = router;
