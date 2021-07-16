const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require("path");
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    destination: (req, file, cb) => {
        cb(null, '../controlcitas/src/assets');
    }
});

require('dotenv').config();

// Settings
app.set('port', process.env.PORT || 3000);
// Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multer({ storage }).single('imagen'));
// Routes

// Public routes
app.use(require('./routes/publicRoutes/branchOffices'));
app.use(require('./routes/publicRoutes/services'));
app.use(require('./routes/publicRoutes/employees'));
app.use(require('./routes/publicRoutes/news'));
app.use(require('./routes/publicRoutes/auth'));
app.use(require('./routes/publicRoutes/users'));
app.use(require('./routes/publicRoutes/sucursales'));
app.use(require('./routes/publicRoutes/employee_service'));
app.use(require('./routes/publicRoutes/dates'));
app.use(require('./routes/publicRoutes/schedules'));
app.use(require('./routes/publicRoutes/dates'));
// app.use(require('./routes/publicRoutes/dates_users'));
app.use(require('./routes/publicRoutes/options'));
app.use(require('./routes/publicRoutes/webhook'));
app.use(require('./routes/publicRoutes/correo'));

// Private Routes with token
app.use(require('./routes/privateRoutes/branchOffices'));
app.use(require('./routes/privateRoutes/services'));
app.use(require('./routes/privateRoutes/employees'));
app.use(require('./routes/privateRoutes/news'));
app.use(require('./routes/privateRoutes/auth'));
app.use(require('./routes/privateRoutes/sucursales'));
app.use(require('./routes/privateRoutes/employee_service'));
app.use(require('./routes/privateRoutes/dates'));
app.use(require('./routes/privateRoutes/schedules'));
app.use(require('./routes/privateRoutes/options'));
app.use(require('./routes/privateRoutes/users'));

// Private route to send email


// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});