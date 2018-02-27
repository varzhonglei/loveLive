var crypto = require('crypto');

function md5 (str){
    return crypto.createHash('md5').update(str).digest('hex');
}

function generateSalt () {
    return md5('lovelive' + Math.floor( Math.random()*10000)).substr(0,10)
}

exports.md5 = md5;
exports.generateSalt = generateSalt;