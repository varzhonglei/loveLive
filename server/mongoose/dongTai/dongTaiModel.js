var mongoose = require('mongoose');
var dongTaiSchema = require('./dongTaiSchema');

var dongTai = mongoose.model('dongTai', dongTaiSchema);

module.exports = dongTai