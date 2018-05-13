
module.exports = function (app){
    app.all('*', function(req, res, next) {

        // if( req.headers.origin == 'http://localhost:8000' || req.headers.origin == 'http://179357c9y4.iok.la:24639' ){
        //       res.header("Access-Control-Allow-Origin", req.headers.origin);
        // }
        //大赦天下 可能不安全哟
        res.header("Access-Control-Allow-Origin", req.headers.origin);

        res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        
        //这段我也不太知道，存在就有他的道理，不懂的还是先注释封印了吧
        // res.header("X-Powered-By", ' 3.2.1')
        
        //允许客户端发送cookie
        res.header('Access-Control-Allow-Credentials', 'true');

        //这段仅仅为了方便返回json而已
        //res.header("Content-Type", "application/json;");

        if(req.method == 'OPTIONS') {
            //让options请求快速返回
            res.sendStatus(200);
        } else {
            next();
        }
    });
}

