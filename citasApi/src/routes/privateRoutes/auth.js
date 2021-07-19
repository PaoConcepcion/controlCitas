const express = require('express');
const router = express.Router();
const mysqlConnection = require('../../database');
const bcrypt = require('bcrypt');
const user = require('../../model/user');

router.post('/register', (req, res) => {
    req.body.contrasena = bcrypt.hashSync(req.body.contrasena, 10);
    req.body.estatus = 1;
    let body = req.body;
    user.createUser(mysqlConnection, body, (data => {
        res.json(data);
    }));
});

module.exports = router;
