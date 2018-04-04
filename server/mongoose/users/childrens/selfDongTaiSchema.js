var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var selfDongTaiSchema = new Schema({
    detail: {type: Schema.Types.ObjectId, ref: 'dongTai'},
    whoPraise: [{type: Schema.Types.ObjectId, ref: 'UserModel'}],
    whoComment: [{type: Schema.Types.ObjectId, ref: 'UserModel'}]
})

module.exports = selfDongTaiSchema