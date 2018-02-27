var express = require('express');
var _ = require('underscore');

var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);

var dbUrl = 'mongodb://localhost/lovelive';
mongoose.connect(dbUrl);

var app = express();
app.use(express.static('../loveLive'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'loveliveLovelive',
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