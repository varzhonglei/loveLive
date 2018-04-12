var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var dialogueSchema = new Schema({
    messages: [{type: ObjectId, ref: 'Message'}],
    theTwo: String
})

module.exports = dialogueSchema
