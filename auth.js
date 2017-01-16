var mongoose = require('mongoose');
var User = mongoose.model('User');
var service = require('./service');

exports.emailSignup = function(req, res) {
    var user = new User({
        nombre:     req.body.nombre,
        contrasena: req.body.contrasena,
        correo:     req.body.correo
    });

    user.save(function(err){
        return res
            .status(200)
            .send({token: service.createToken(user)});
    });
};

exports.emailLogin = function(req, res) {
    User.findOne({correo: req.body.correo.toLowerCase()}, function(err, user) {
        // Comprobar si hay errores
        // Si el usuario existe o no
        // Y si la contraseña es correcta
        return res
            .status(200)
            .send({token: service.createToken(user)});
    });
};
