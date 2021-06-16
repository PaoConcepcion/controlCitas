const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

require('dotenv').config();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes

// Public routes
app.use(require('./routes/publicRoutes/branchOffices'));
app.use(require('./routes/publicRoutes/services'));
app.use(require('./routes/publicRoutes/employees'));
app.use(require('./routes/publicRoutes/news'));
app.use(require('./routes/publicRoutes/auth'));
app.use(require('./routes/publicRoutes/users'));
app.use(require('./routes/publicRoutes/employee_service'));

// Private Routes with token
app.use(require('./routes/privateRoutes/branchOffices'));
app.use(require('./routes/privateRoutes/services'));
app.use(require('./routes/privateRoutes/employees'));
app.use(require('./routes/privateRoutes/news'));
app.use(require('./routes/privateRoutes/auth'));
app.use(require('./routes/privateRoutes/employee_service'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

