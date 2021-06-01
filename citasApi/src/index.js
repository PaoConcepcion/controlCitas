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
app.use(require('./routes/news'));
app.use(require('./routes/auth'));

// A partir de aquí las rutas necesitan el token de inicio de sesion en el header


// A partir de aquí solo los token con usuarios admin se admiten
app.use(require('./routes/services'));
app.use(require('./routes/employees'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

