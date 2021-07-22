const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../database');

router.put('/options/:id_opciones', (req, res) => {
    const { nombre_sitio, logotipo, icono, facebook, instagram, contacto, acerca_de } = req.body;
    const { id_opciones } = req.params;
    const query = 'CALL optionsEdit(?, ?, ?, ?, ?, ?, ?, ?)';
    mysqlConnection.query(query, [id_opciones, nombre_sitio, logotipo, icono, facebook, instagram, contacto, acerca_de], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Options updated'});
        } else {
            console.log(err);
        }
    });
});

// router.post('/upload', (req, res) => {
//     res.send('imagen upload')
//     console.log(req.file)
// })

module.exports = router;