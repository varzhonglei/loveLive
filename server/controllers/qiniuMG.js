'use strict'

var UserModel = require('../mongoose/users/UserModel');
var qiniu = require("qiniu");

//需要填写你的 Access Key 和 Secret Key
const accessKey = 'LQ7l5wNjQmuRroRwJHqoosVND2bY4sClHk7jWg_9';
const secretKey = 'TdOWOHL9t13kGC3HtpDH5GDR9Ui0_0IfRZJ85GWC';
qiniu.conf.ACCESS_KEY = accessKey;
qiniu.conf.SECRET_KEY = secretKey;
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);


class qiniuMGConstructor {
	constructor(props) {
	}
    getToken(req, res){
        var _id = req.session.user_id;
        var bucket = 'lovelivephoto';
        var keyToOverwrite = `${_id}_avatar.png`;
        var options = {
            scope: bucket + ":" + keyToOverwrite
        };
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var uploadToken = putPolicy.uploadToken(mac);
        res.send(uploadToken)
    }
    async saveUrl(req, res){
        let _id = req.session.user_id;
        var avatarUrl =  'http://p6fs5mtoh.bkt.clouddn.com/' + req.body.key +'?' + Math.ceil(Math.random()*10000); //加随机数从而不去cdn缓存中读文件
        if (_id){
            UserModel.update({ _id: _id }, { $set: { avatarUrl: avatarUrl } }, {multi:true}, function(err, raw){
                if (err) {
                    console.log(err)
                    res.send({
                        status: 1,
                        msg: '保存图片链接失败'
                    })
                }else{
                    console.log('mongodb返回的更改状态的falg:', raw); 
                    console.log('userAvatarUrl update complet')
                    res.send({
                        status: 0,
                        msg: 'success'
                    }) 
                } 
            } )
        }  
    }
}

var qiniuMG = new qiniuMGConstructor();

export default qiniuMG