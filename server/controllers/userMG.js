'use strict'

var UserModel = require('../mongoose/users/UserModel');
var relation = require('../mongoose/relation/relationModel');

class userMGConstructor {
	constructor(props) {
	}
    async signup (req, res) {
        try{
            var _user = req.body.user;
            var user = new UserModel(_user);
            var dafaultRelation = new relation({});
            user.relation = dafaultRelation._id;
            dafaultRelation.own_id = user._id;
            var hasUser = await UserModel.findOne( { account: req.body.user.account })
            if( hasUser ){
                res.send( '该账户已被注册' )
            }else{
                await user.save()      
                await dafaultRelation.save()
                res.send('signupSuccess')      
            }
        }catch(err){
            console.log(err)
            res.send('注册失败')
        }
    }
	async fixUserInfo(req, res, next){
        let _id = req.body.baseUserInfo._id;
        let newUserInfo = Object.assign({},req.body.baseUserInfo);
        delete newUserInfo._id
        if (_id){
            UserModel.update({ _id: _id }, { $set: newUserInfo }, {multi:true}, function(err, raw){
                if (err) {
                    console.log(err)
                    res.send('failure')
                }else{
                    console.log('mongodb返回的更改状态的falg:', raw);
                    res.send('success')
                } 
            } )
        }
	}
    async getOtherInfo(req, res, next){
       UserModel.findOne( { _id: req.query.other_id }, function(err, theOtherInfo ){
            var tempObj = Object.assign({}, theOtherInfo._doc)
            delete tempObj.password
            res.send({
                status: 0,
                data: tempObj
            })
       })
    }
    async addFriend(req, res, next){
        var own_id = req.query.own_id,
            other_id = req.query.other_id;
        try{
            var theUserRelation = await relation.findOne({own_id: own_id});
            var remenberYou = theUserRelation.remenberYou;
            if ( remenberYou.indexOf(other_id) === -1 ){
                remenberYou.push(other_id);
                await theUserRelation.save()
                res.send({
                    status: 0,
                    msg: 'success'
                })
            }else{
                res.send({
                    status: 0,
                    msg: 'alreadyIsFriend'
                })
            }
        }catch(err){
            console.log(err)
            res.send({
                status: 0,
                type: 'DB_ERR',
                msg: 'server_err'
            })
        }
        
        relation.findOne({own_id: own_id}, function(err, theUserRelation){
           
        })
    }
    getUserInfo(req, res){
        var _id = req.session.user_id;
        UserModel.findOne({ '_id': _id }, function( err, theUser ){
            if ( err ) console.log(err) 
            if ( theUser ){
                let tempUser = Object.assign({}, theUser._doc);
                delete tempUser.password;
                res.send({
                        status: 0,
                        data: tempUser,
                })
            }else{
                res.send({
                status: 0,
                type: 'DB_NOT_FOUND',
                message: '无效的session',
                })
            }
        })
    }
    async getRelationList(req, res){
        try{
            var _id = req.session.user_id,
                relationList = {};
            var theUserRelation  = await relation.findOne({ own_id: _id });
            relationList.theUserRelation = theUserRelation;
            relationList.friends = await UserModel.find({_id: { $in: theUserRelation.remenberYou }})
                                                  .select({_id:1, avatarUrl: 1, userName: 1 });
            relationList.blackList = await UserModel.find({_id: { $in: theUserRelation.blackList }})
                                                    .select({_id:1, avatarUrl: 1, userName: 1 });
            relationList.metPersons = await UserModel.find({_id: { $in: theUserRelation.meet.thePerson_id }})
                                                     .select({_id:1, avatarUrl: 1, userName: 1 });
            res.send({
                status: 0,
                data: relationList
            })
        }catch(err){
            console.log(err)
            res.send({
                status: 1,
                type: 'DB_ERR'
            })
        }
    }
}

var userMG = new userMGConstructor();

export default userMG