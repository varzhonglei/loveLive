var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dongTaiSchema = new Schema({
    content: {
        type: String,
        default: '我就是随便吐槽一下'
    },
    whoPraise: [{type: Schema.Types.ObjectId, ref: 'UserModel'}],
    whoComment: [{type: Schema.Types.ObjectId, ref: 'UserModel'}],
    meta: {
        creatAt:{
            type: Date,
            default: Date.now()
        }
    }
})

module.exports = dongTaiSchema