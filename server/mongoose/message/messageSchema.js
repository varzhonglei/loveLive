var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var messageSchema = new Schema({
    to: { type: ObjectId, ref: 'UserModel'},
    from: { type: ObjectId, ref: 'UserModel'},
    msgItemContent: String,
    Date: Date
})

module.exports = messageSchema