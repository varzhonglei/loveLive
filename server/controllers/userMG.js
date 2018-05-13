'use strict'

var UserModel = require('../mongoose/users/UserModel');
var relation = require('../mongoose/relation/relationModel');
var Message = require('../mongoose/message/messageModel');

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
    async getUserInfo(req, res){  
        try{
            var _id = req.session.user_id;
            let findResults = await dbFindMsgAndUserInfo(_id);//不仅仅获取用户信息，这里还多获取了离线消息
            if ( findResults.data ){
                res.send({
                        ...findResults,
                        status: 0
                })
            }else{
                res.send({
                status: 0,
                type: 'DB_NOT_FOUND',
                message: '无效的session',
                })
            }
            UserModel.update({ '_id': _id }, { $set: { "meta.lastOnLine":  Date.now() } }, function(err, raw){
                if (err) console.log(err)
            });
        }catch(e){
            console.log(e)
            res.send({
                status: 0,
                type: 'DB_ERR',
                message: '无效的session',
                })
        }
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
                type: 'DB_ERR',
                msg: err
            })
        }
    }
    async clearReadMsg(req, res){
        let own_id = req.session.user_id,
            other_id = req.query.other_id;
        try{
            let userInfo = await UserModel.findOne({ _id: own_id });
            userInfo.offLineMessages = userInfo.offLineMessages.filter((item,index)=>{
                return item.theOne_id === other_id
            });
            await userInfo.save();
            res.send({
                status: 0,
                msg: '清除未读消息成功' 
            })
        }catch(e){
            console.log(e)
        }
    }
    async searchUser(req, res){
        let searchKey = req.query.searchKey;
        let searchResults;
        try{
            let val1 = await UserModel.find({account: searchKey }).limit(1);
            let val2 = await UserModel.find({userName: new RegExp(searchKey)}).limit(10); 
            searchResults = [...val1, ...val2];
            res.send({
                state: 0,
                searchResults: searchResults
            })
        }catch(e) {
            res.send({
                state: 0,
                type: 'DB_ERR',
                searchResults: []
            })
            console.log(e)
        }
    }
    async getUsersByRandom(req, res){
        try{
            let _id = req.session.user_id;
            let theUser = await UserModel.findOne({_id: _id});
            let city = theUser.city,
                age = theUser.age || 23,
                sex = theUser.sex;
            let tempArr = await UserModel.find({age: {$gte: age - 5, $lte: age + 5}, sex: { $nin: [sex]}  } )
                           .sort({'lastOnLine': -1})
                           .limit(31);
            let resUser = [];
            let ssr = false;
            if (tempArr.length >= 31){
                resUser = tempArr[ (new Date()).getDate() - 1 ];
            }else{
                resUser = tempArr[ Math.floor( Math.random() * (tempArr.length) )]
            }
            if ( Math.random() < 0.04 ){
                tempArr = await UserModel.find({ sex: sex}).sort({'lastOnLine': -1}).limit(1);
                resUser = tempArr[0];
                ssr = true;
            }
            //防止没有合适的人,随便塞一个异性给返回数据
            resUser = resUser ||  await UserModel.findOne({ sex: { $nin: [sex]} });
            res.send({
                state: 0,
                data: resUser,
                srr: ssr
            })
        }catch(e){
            console.log(e)
            res.send({
                state: 0,
                type: 'DB_ERR'
            })
        }
    }
    async login(req, res){
        var _account = req.body.account,
        _password = req.body.password;
        UserModel.findOne({ account: _account }, function (err, hasTheUser){
            var resObj = {};
            if(hasTheUser){
                hasTheUser.comparePassword(_password,async function (isMatch){
                    if(isMatch){
                        req.session.user_id = hasTheUser._id;
                        let findResults = await dbFindMsgAndUserInfo(req.session.user_id);
                        resObj = { ...findResults };
                        resObj.loginState = 'loginSuccess';
                    }else{
                        resObj.loginState = '密码错误';
                    }
                    res.send(JSON.stringify(resObj))
                })
            }else{
                resObj.loginState = '账号未注册';
                res.send(JSON.stringify(resObj))
            }
        })
    }
}

async function dbFindMsgAndUserInfo(_id){
    try {
        let theUser = await UserModel.findOne({ '_id': _id }).select({password: 0});
        let msg_idArr = theUser.offLineMessages.map( (item, index, arr) =>{
            return item.msg_id
        } );
        let msgArr = await Message.find({_id: { $in: msg_idArr }})
                                    .populate({path: 'from', select: 'avatarUrl userName'});
        return {
            data: theUser,
            msgArr: msgArr
        }
    }catch(e){
        console.log(e)
        return {}
    }
}

var userMG = new userMGConstructor();

export default userMG