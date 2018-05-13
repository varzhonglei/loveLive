var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var dongTaiSchema = new Schema({
    content: {
        type: String,
        default: '我想说啥来着'
    },
    img: {
        type: Array,
        default: []
    },
    whoPublish: {type: ObjectId, ref: 'UserModel'},
    whoPraise: [{type: ObjectId, ref: 'UserModel'}], 
    reply: [{
        from: {type: ObjectId, ref: 'UserModel'},
        to: {type: ObjectId, ref: 'UserModel'},
        content: String
    }],
    meta: {
        creatAt:{
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    },
})

dongTaiSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.creatAt = this.meta.updateAt = Date.now()
    }
    else {
        this.meta.updateAt = Date.now()
    }
    next();
})


dongTaiSchema.statics = {
    fetch (cb) {
        return this.find({}).sort('meta.updateAt').exec(cb)
    }
}

module.exports = dongTaiSchema


