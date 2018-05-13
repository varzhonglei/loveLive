require('babel-core/register');
var express = require('express');
var _ = require('underscore');
var config = require('./config')

var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);

var dbUrl = 'mongodb://localhost:27017/lovelive'; 

//新建字段时关闭自动排序提高性能
mongoose.connect(dbUrl,{ config: { autoIndex: false } });

var app = express();

//允许跨越访问
require('./routes/cors')(app) 


app.use(express.static('../loveLive'));
//服务器提交数据json化
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'loveliveLovelive',
    name: 'connect.sid',
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure:   false,
        maxAge:   config.session.maxAge
    },
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}))


require('./routes/routes')(app)



var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

require('./websocket/websocket')(server)
