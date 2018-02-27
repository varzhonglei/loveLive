var mongoose = require('mongoose');
var UserSchema = require('../schema/UserSchema');

var UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel