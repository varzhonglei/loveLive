var mongoose = require('mongoose');
var { md5, generateSalt } = require('../../common/md5.js');


var UserSchema = new mongoose.Schema({
    account: String,
    password: String,
    sex: String,
    years: String,
    meta: {
        creatAt:{
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

UserSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.creatAt = this.meta.updateAt = Date.now()
    }
    else {
        this.meta.updateAt = Date.now()
    }
    var salt = generateSalt();
    this.password =  salt + md5(this.password + salt)
    next();
})

UserSchema.methods = {
    comparePassword (_password, cb) {
        var hashPass = this.password;
        var salt = hashPass.substr(0,10);
        var validHash = salt + md5(_password + salt)
        cb(hashPass === validHash)
    }
}

UserSchema.statics = {
    fetch (cb) {
        return this.find({}).sort('meta.updateAt').exec(cb)
    },
    findByAccount (account, cb) {
        return this.findOne({account: account}).exec(cb)
    }
}

module.exports = UserSchema