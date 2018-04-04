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

module.exports = relationSchema
