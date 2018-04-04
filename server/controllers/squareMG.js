'use strict'

var UserModel = require('../mongoose/users/UserModel');
var dongTai = require('../mongoose/dongTai/dongTaiModel');

class SquareMGConstructor {
	constructor(props) {

	}
	async getDongTais(req, res, next){
        var getNum = req.body.getNum,
            counterpart_time = req.body.counterpart_time,
            theDongTais = [];
        if (req.body.getType === 'INIT'){
            theDongTais = await dongTai.find()
                                        .populate({path: 'whoPublish', select: 'avatarUrl userName'})
                                        .sort({'meta.updateAt': -1})
                                        .limit(getNum);
        } else if ( req.body.getType === 'REFRESH' ){
            theDongTais = await dongTai.find({ 'meta.updateAt': { $gte: counterpart_time, $ne: counterpart_time} })
                                       .populate({path: 'whoPublish', select: 'avatarUrl userName'})
                                       .sort({'meta.updateAt': -1})
                                       .limit(getNum);
        } else if ( req.body.getType === 'GET_OLD' ){
            theDongTais = await dongTai.find( {'meta.updateAt': { $lte: counterpart_time,$ne: counterpart_time } })
                                        .populate({path: 'whoPublish', select: 'avatarUrl userName'})
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
	}
}

var squareMG = new SquareMGConstructor();

export default squareMG
