var UserModel = require('../mongoose/users/UserModel');
var path = require('path');

module.exports = function (app){

app.get('/getUserInfo', function(req, res){
    var resObj = req.session.user;
    if( resObj ){
        res.send(JSON.stringify(resObj))
    }else{
        res.send('noSession')
    }
})

app.post('/fixInfoReq', function(req, res){
    console.log(req.body.baseUserInfo)
    res.send('success');
})

app.post('/signup', function (req, res) {
    var _user = req.body.user;
    var user = new UserModel(_user);
    UserModel.findByAccount( _user.account, function ( err, hasUser ) {
        if(hasUser){
            res.send( '该账户已被注册' )
        }else{
            user.save(function(err, user){
                if(err){
                    console.log(err)
                }
                res.send('signupSuccess')
            })            
        }
    })
})

app.post('/test', function (req, res) {
    console.log('user in session:')
    console.log(req.session.user);
    res.send('bababa')
})

app.get('./logout', function (req, res){
    delete req.session.user
})

app.post('/login', function (req, res) {
    var _account = req.body.account,
        _password = req.body.password;
    UserModel.findOne({ account: _account }, function (err, hasUser){
        var resObj = {};
        if(hasUser){
            hasUser.comparePassword(_password, function (isMatch){
                if(isMatch){
                    req.session.user = hasUser;
                    resObj.userInfo = hasUser;
                    resObj.loginState = 'loginSuccess';
                }else{
                    resObj.loginState = '密码错误';
                }
                res.send(JSON.stringify(resObj))
            })
        }else{
            resObj.loginState = '账号未注册'
            res.send(JSON.stringify(resObj))
        }
    })
})

// app.get('*', function (req, res) {
//     console.log('收到一个未匹配路由：')
//     res.sendFile(path.join(__dirname,'../../loveLive/index.html'))
// })

}

