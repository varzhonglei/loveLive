var mongoose = require('mongoose');
var relationSchema = require('./relationSchema');

var relation = mongoose.model('relation', relationSchema);

module.exports = relation