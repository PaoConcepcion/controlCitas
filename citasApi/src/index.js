const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
    destination: (req, file, cb) => {
        cb(null, '../../controlcitas/src/assets');
    }
});

// Settings
app.set('port', process.env.PORT || 3000);
// Middlewares
app.use(express.json());
app.use(cors());
app.use(multer({
    storage, 
    dest: '../../controlcitas/src/assets' 
}).single('imagen'));
// Routes
app.use(require('./routes/news'));
app.use(require('./routes/employees'));
// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});