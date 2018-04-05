'use strict';

var UserModel = require('../mongoose/users/UserModel');
var dongTai = require('../mongoose/dongTai/dongTaiModel');
var path = require('path');
import  squareMG  from '../controllers/squareMG'
import  userMG  from '../controllers/userMG'
import  checkMG  from '../middlewares/check'

module.exports = function (app){

app.get('/getUserInfo', checkMG.sessionCheck, userMG.getUserInfo)

app.post('/fixInfoReq', checkMG.sessionCheck, userMG.fixUserInfo)

app.post('/signup', userMG.signup)

app.post('/test', function (req, res) {
    console.log('user in session:')
    console.log(req.session.user_id);
    res.send('bababa')
})

app.get('/signout', function (req, res){
    if( req.session.user_id ) delete req.session.user_id;
    res.send({
        status: 0,
        message: '登出成功',
	})
})

app.post('/login', function (req, res) {
    var _account = req.body.account,
        _password = req.body.password;
    UserModel.findOne({ account: _account }, function (err, hasTheUser){
        var resObj = {};
        if(hasTheUser){
            hasTheUser.comparePassword(_password, function (isMatch){
                if(isMatch){
                    req.session.user_id = hasTheUser._id;
                    resObj.userInfo = { ...hasTheUser._doc };
                    delete resObj.userInfo.password;
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
})

app.post('/postNewDongTai', checkMG.sessionCheck, function (req, res){
    const user_id = req.session.user_id;
    if ( !user_id ){
        res.send({
				status: 0,
				type: 'ERROR_SESSION',
				message: '亲，您还没有登录',
			})
        
    }else{
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
})

app.post('/square/getDongTais', squareMG.getDongTais)

app.get('/getOtherInfo', checkMG.sessionCheck, userMG.getOtherInfo)

app.get('/addFriend', checkMG.sessionCheck, userMG.addFriend)

app.get('/getRelationList', userMG.getRelationList)

app.get('*', function (req, res) {
    console.log('收到一个未匹配路由：' + req.originalUrl)
    res.sendFile(path.join(__dirname,'../../loveLive/index.html'))
})

}

