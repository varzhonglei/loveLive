'use strict';

class Check {
	constructor(){
		
	}
	async sessionCheck(req, res, next){
        const userInSession = req.session.user_id;
        if ( userInSession ){
            next()
        }else{
           //res.redirect('/login') 并没有让页面重定向，只是让ajax重定向了
           res.send({
                status: 0,
                type: 'DB_NOT_FOUND',
                message: '无效的session',
                })
        }
	}
}

let checkMG = new Check();

export default checkMG