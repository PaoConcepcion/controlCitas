const express = require('express');
const router = express.Router();
const mysqlConnection = require('../../database');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const moment = require('moment');
const user = require('../../model/user');

const crearToken = (empleado) => {
    let payload = {
        id_empleado: empleado.id_empleado,
        rol: empleado.rol,
        createdAt: moment().unix(),
        // expiresAt: moment().add(1, 'day').unix()
    }
    return jwt.encode(payload, process.env.TOKEN_KEY);
};

router.post('/register', (req, res) => {
    req.body.contrasena = bcrypt.hashSync(req.body.contrasena, 10);
    req.body.estatus = 1;
    let body = req.body;
    user.createUser(mysqlConnection, body, (data => {
        res.json(data);
    }));
});

router.get('/nomSucursales', (req, res) => {
    user.getSucursales(mysqlConnection, (data => {
        res.json(data);
    }))
});

router.post('/login', (req, res) => {
    let correo = req.body.correo;
    user.getByCorreo(mysqlConnection, correo, (data => {

        if (data.array.length === 0) {
            return res.status(400).json({ message: 'Correo o contraseña incorrecta' });
        } else {
            const equals = bcrypt.compareSync(req.body.contrasena, data.array[0].contrasena);
            if (!equals) {
                return res.status(400).json({ message: 'Correo o contraseña incorrecta' });
            } else {
                res.json({
                    message: 'OK',
                    token: crearToken(data.array[0]),
                    id_empleado: data.array[0].id_empleado,
                    rol: data.array[0].rol,
                    nombre: data.array[0].nombre
                })
            }
        }
    }));

});

module.exports = router;
