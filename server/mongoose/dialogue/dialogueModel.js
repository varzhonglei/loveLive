var mongoose = require('mongoose');
var dialogueSchema = require('./dialogueSchema');

var Dialogue = mongoose.model('Dialogue', dialogueSchema);

module.exports = Dialogue
