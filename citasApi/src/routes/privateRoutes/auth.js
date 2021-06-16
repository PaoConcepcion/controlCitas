/* const express = require('express');
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
        expiresAt: moment().add(1, 'day').unix()
    }
    return jwt.encode(payload, process.env.TOKEN_KEY);
};

module.exports = router; */
