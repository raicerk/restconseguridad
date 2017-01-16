// Importamos nuestros modelos,
// en este ejemplo nuestro modelo de usuario
require('./models/user');

// server.js
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var authCtrl = require('./auth');
var middleware = require('./middleware');



// Configuramos Express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.set('port', 3000);



// Iniciamos las rutas de nuestro servidor/API
var router = express.Router();

router.get('/', function(req, res) {
   res.send("Hello World!");
});

// Rutas de autenticación y login
router.post('/auth/signup', authCtrl.emailSignup);
router.post('/auth/login', authCtrl.emailLogin);

// Ruta solo accesible si estás autenticado
router.get('/private',middleware.ensureAuthenticated, function(req, res) {
    //
} );

app.use(router);

// Iniciamos el servidor y la base de datos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost', function(err) {
    // Comprobar errores siempre
    app.listen(app.get('port'), function(){
        console.log('Express corriendo en http://localhost:3000');
    });
});
