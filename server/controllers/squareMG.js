'use strict'

var UserModel = require('../mongoose/users/UserModel');
var dongTai = require('../mongoose/dongTai/dongTaiModel');

class SquareMGConstructor {
	constructor(props) {

	}
    newDongTai(req, res){
        var _dongTai = req.body.dongTai;
        var newDongTai = new dongTai(_dongTai)
        newDongTai.save(function(err, newDongTai){
            if (err) console.log(err)
            res.send({
                status: 0,
                message: '发表成功',
            })
        })
    }
	async getDongTais(req, res, next){
        try{
            var getNum = req.body.getNum,
                counterpart_time = req.body.counterpart_time,
                theDongTais = [];
            if (req.body.getType === 'INIT'){
                theDongTais = await dongTai.find()
                                            .populate({path: 'whoPublish', select: 'avatarUrl userName'})
                                            .populate({path: 'reply.to reply.from', select: 'userName'})
                                            .sort({'meta.updateAt': -1})
                                            .limit(getNum);
            } else if ( req.body.getType === 'REFRESH' ){
                theDongTais = await dongTai.find({ 'meta.updateAt': { $gte: counterpart_time, $ne: counterpart_time} })
                                        .populate({path: 'whoPublish', select: 'avatarUrl userName'})
                                        .populate({path: 'reply.to reply.from', select: 'userName'})
                                        .sort({'meta.updateAt': -1})
                                        .limit(getNum);
            } else if ( req.body.getType === 'GET_OLD' ){
                theDongTais = await dongTai.find( {'meta.updateAt': { $lte: counterpart_time,$ne: counterpart_time } })
                                            .populate({path: 'whoPublish', select: 'avatarUrl userName'})
                                            .populate({path: 'reply.to reply.from', select: 'userName'})
                                            .sort({'meta.updateAt': -1})
                                            .limit(getNum)
            } else{
                res.send({
                    status: 0,
                    type: 'ERROR_GET_TYPE'
                })
                return
            }
            res.send({
                status: 0,
                data: theDongTais
            })
        }catch(e){
            console.log(e)
            res.send({
                status: -1,
                type: 'DB_REE',
                msg: 'DB_REE'
            })
        }
	}
    async dongTaiReply(req, res){
        let data = req.body.data,
            reply = {
                to: data.to,
                from: data.from,
                content: data.content
            };
        try{
            let theDongTai = await dongTai.findOne({_id: data.dongTai_id});
                theDongTai.reply.push(reply);
            let theDongTai_id = theDongTai._id;
            await dongTai.update({_id: theDongTai_id}, { $set: { reply: theDongTai.reply }})
            let theUser = await UserModel.findOne({ _id: data.to });
            if ( theUser.newReply.indexOf(theDongTai_id) === -1 ){
                theUser.newReply.push(theDongTai_id)
            }
            await theUser.save();
            res.send({
                state: 0,
                msg: '评论成功'
            })
        }catch(e){
            console.log(e)
            res.send({
                state: -1,
                msg: '评论失败'
            })
        }
    }
    async getDongtaiByIds(req, res){
        let dongTaiIds = req.body.data,
            user_id = req.session.user_id;
        try{
            let dongTais = await dongTai.find({_id: {$in: dongTaiIds}})
                                        .populate({path: 'whoPublish', select: 'avatarUrl userName'})
                                        .populate({path: 'reply.to reply.from', select: 'userName'})
                                        .sort({'meta.updateAt': -1});
            await UserModel.findOneAndUpdate({_id: user_id},{ $set: { newReply: [] } });
            res.send({
                state: 0,
                dongTais: dongTais
            })
        }catch(e){
            console.log(e)
            res.send({
                state: -1,
                type: 'SERVER_BD_ERR',
                msg: 'SERVER_BD_ERR'
            })
        }
    }
    async deleteDongtai(req, res){
        let user_id = req.session.user_id;
        let dongTai_id = req.body._id;
        let admin = await UserModel.findOne({_id: user_id});
        if ( admin && admin.account == 'admin' ) {
           await dongTai.remove({_id: dongTai_id});
           res.send({
               status: 0,
               message: '删除动态成功'
           })
        }else{
            res.send({
                status: 1,
                message: '无权限'
            })
        }
    }
}

var squareMG = new SquareMGConstructor();

export default squareMG
