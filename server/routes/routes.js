'use strict';

var UserModel = require('../mongoose/users/UserModel');
var dongTai = require('../mongoose/dongTai/dongTaiModel');
var path = require('path');
import  squareMG  from '../controllers/squareMG'
import  userMG  from '../controllers/userMG'
import  checkMG  from '../middlewares/check'

module.exports = function (app){
//用户管理员
app.get('/getUserInfo', checkMG.sessionCheck, userMG.getUserInfo)

app.post('/fixInfoReq', checkMG.sessionCheck, userMG.fixUserInfo)

app.post('/signup', userMG.signup)

app.get('/getOtherInfo', checkMG.sessionCheck, userMG.getOtherInfo)

app.get('/addFriend', checkMG.sessionCheck, userMG.addFriend)

app.get('/getRelationList', userMG.getRelationList)

app.get('/clearReadMsg', userMG.clearReadMsg)


//广场动态管理员
app.post('/postNewDongTai', checkMG.sessionCheck, squareMG.newDongTai)

app.post('/dongTaiReply', checkMG.sessionCheck, squareMG.dongTaiReply)

app.post('/square/getDongTais', checkMG.sessionCheck, squareMG.getDongTais)

app.post('/getDongtaiByIds', checkMG.sessionCheck, squareMG.getDongtaiByIds)


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

app.get('*', function (req, res) {
    console.log('收到一个未匹配路由：' + req.originalUrl)
    res.send('404, not found')
    // res.sendFile(path.join(__dirname,'../../loveLive/index.html'))
})

}

