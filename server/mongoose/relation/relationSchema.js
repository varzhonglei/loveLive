var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var relationSchema = new Schema({
    own_id: {type: ObjectId, ref: 'UserModel'},
    meet: [
        { 
            thePerson_id: {type: ObjectId, ref: 'UserModel'},
            meetNumber: Number,
        }
    ],
    remenberYou: [ {type: ObjectId, ref: 'UserModel'} ],
    blackList: [ {type: ObjectId, ref: 'UserModel'} ]
})

// 2018/5/5   这张表直接放在用户表里会不会更好？
module.exports = relationSchema

 