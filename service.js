var jwt = require('jsonwebtoken');
var moment = require('moment');
var config = require('./config');

exports.createToken = function(user) {
    var token = jwt.sign({
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(1, "minutes").unix()
    }, config.TOKEN_SECRET);
    return token;
};
