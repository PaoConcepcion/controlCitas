const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../database');

const middleware = require('../middleware');
const middlewareAdmin = require('../middleware_admin');

router.use(middleware.checkToken);

router.post('/branchOffices', (req, res) => {
    const { id_sucursal, nombre, telefono, cp, colonia, calle, numero_exterior, numero_interior, latitud, longitud } = req.body;
    const query = `
        CALL branchOfficeAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [id_sucursal, nombre, telefono, cp, colonia, calle, numero_exterior, numero_interior, latitud, longitud], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'branchOffice saved'});
        } else {
            console.log(err);
        }
    });
});

router.put('/branchOffices/:id_sucursal', (req, res) => {
    const { nombre, telefono, cp, colonia, calle, numero_exterior, numero_interior, latitud, longitud } = req.body;
    const { id_sucursal } = req.params;
    const query = 'CALL branchOfficeAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    mysqlConnection.query(query, [id_sucursal, nombre, telefono, cp, colonia, calle, numero_exterior, numero_interior, latitud, longitud], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'branchOffice updated'});
        } else {
            console.log(err);
        }
    });
});

router.delete('/branchOffices/:id_sucursal', (req, res) => {
    const {id_sucursal} = req.params;
    mysqlConnection.query('DELETE FROM sucursales WHERE id_sucursal = ?', [id_sucursal], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'branchOffice deleted'});
        } else {
            console.log(err);
        }
    });
}); 

module.exports = router;