var mongoose = require('mongoose');
var UserSchema = require('./UserSchema');

var UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel