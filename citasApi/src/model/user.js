module.exports = {
    createUser: (connection, body, callback) => {
        connection.query('insert into empleados SET  ?', body, (err, results) => {
            if (err) {
                callback({ array: null, id: null, success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results, id: null, success: true });
        });
    },

    getByCorreo: (connection, correo, callback) => {
        connection.query(`select * from empleados where correo = '${correo}' and estatus = 1`, (err, results) => {
            if (err) {
                callback({ success: false, err: JSON.stringify(err) });
                return;
            }
            callback({ array: results || null, success: true });
        })
    },
} 
