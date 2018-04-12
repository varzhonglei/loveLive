var mongoose = require('mongoose');
var messageSchema = require('./messageSchema');

var Message = mongoose.model('Message', messageSchema);

module.exports = Message