var UserModel = require('../mongoose/model/UserModel');
var path = require('path');

module.exports = function (app){

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
        if(hasUser){
            hasUser.comparePassword(_password, function (isMatch){
                if(isMatch){
                    req.session.user = hasUser;
                    res.send('loginSuccess')
                }else{
                    res.send('密码错误')
                }
            })
        }else{
            res.send('账号未注册')
        }
    })
})

app.get('*', function (req, res) {
    console.log('收到一个未匹配路由')
    res.sendFile(path.join(__dirname,'../../loveLive/index.html'))
})

}

