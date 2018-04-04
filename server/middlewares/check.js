'use strict';

class Check {
	constructor(){
		
	}
	async sessionCheck(req, res, next){
        const userInSession = req.session.user_id;
        if ( userInSession ){
            next()
        }else{
            res.redirect('/login')
        }
	}
}

let checkMG = new Check();

export default checkMG