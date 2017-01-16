var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var usuarios = new Schema({
  nombre:       { type : String, unique : true, required : true },
  contrasena:   { type : String, unique : true, required : true },
  correo:       { type : String, unique : true, required : true }
});

module.exports = mongoose.model('User', usuarios);
