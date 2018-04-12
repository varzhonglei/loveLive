var mongoose = require('mongoose');
var { md5, generateSalt } = require('../../common/md5.js');
var selfDongTaiSchema = require('./childrens/selfDongTaiSchema');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema({
    account: { 
        type:String,
        unique: true 
    },
    password: String,
    sex: {
        type: String,
        default: 'male'
    },
    age: String,
    height: String,
    weight: String,
    education: String,
    constellation: String,
    job: String,
    city: String,
    userName: {
        type: String,
        default: '未命名用户'
    },
    avatarUrl: String,
    meta: {
        creatAt:{
            type: Date,
            default: Date.now()
        }
    },
    selfDongTai: [selfDongTaiSchema],
    offLineMessages: [{ msg_id: {type: ObjectId, ref: 'Message'},
                        theOne_id: {type: ObjectId, ref: 'UserModel'} }],
    newReply: [{ type: ObjectId, ref: 'dongTai' }],
    relation: {type: ObjectId, ref: 'relation'}
})

UserSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.creatAt = Date.now();
        if( this.sex === 'female' ){
            this.avatarUrl = 'http://p6fs5mtoh.bkt.clouddn.com/image/jpg/female.jpg'
        }else{
            this.avatarUrl = 'http://p6fs5mtoh.bkt.clouddn.com/image/jpg/male.jpg'
        }
        var salt = generateSalt();
        this.password =  salt + md5(this.password + salt)
    }

    next();
})

//实例方法
UserSchema.methods = {
    comparePassword (_password, cb) {
        var hashPass = this.password;
        var salt = hashPass.substr(0,10);
        var validHash = salt + md5(_password + salt);
        cb(hashPass === validHash)
    }
}

UserSchema.statics = {
    fetch (cb) {
        return this.find({}).sort('meta.creatAt').exec(cb)
    },
    findByAccount (account, cb) {
        return this.findOne({account: account}).exec(cb)
    }
}

module.exports = UserSchema

