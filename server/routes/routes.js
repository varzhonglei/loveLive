'use strict';

var UserModel = require('../mongoose/users/UserModel');
var dongTai = require('../mongoose/dongTai/dongTaiModel');
var path = require('path');
import  squareMG  from '../controllers/squareMG'
import  userMG  from '../controllers/userMG'
import  qiniuMG from '../controllers/qiniuMG'
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

app.get('/searchUser', userMG.searchUser)

app.get('/getUsersByRandom', userMG.getUsersByRandom)
 
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

app.post('/login', userMG.login)


app.get('/updateAvatar_getToken', qiniuMG.getToken)

app.post('/updateAvatar_saveUrl', qiniuMG.saveUrl)

app.post('/deleteDongtai', squareMG.deleteDongtai)

app.get('*', function (req, res) {
    console.log('get a mismatched Url:' + req.originalUrl)
    res.sendFile(path.join(__dirname,'../../loveLive/index.html'))
})

}
