var jwt = require('jsonwebtoken');
var moment = require('moment');
var config = require('./config');

exports.createToken = function(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(1, "minutes").unix(),
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};
