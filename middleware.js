var jwt = require('jsonwebtoken');
var moment = require('moment');
var config = require('./config');

exports.ensureAuthenticated = function(req, res, next) {

    try {

        if(!req.headers.authorization) {
            return res
            .status(403)
            .send({message: "Tu petición no tiene cabecera de autorización"});
        }

        var payload = jwt.verify(req.headers.authorization, config.TOKEN_SECRET);
        if(payload.exp <= moment().unix()) {
            return res
            .status(401)
            .send({message: "El token ha expirado"});
        }else{
            req.user = payload.sub;
            next();
            return res.status(200).send({message:"exito"});
        }
    } catch (err) {
        return res.status(401).send({message: err.message});
    }

}
