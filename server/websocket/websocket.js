function websocket (server){
    var io = require('socket.io')(server)
    var rooms = {};
    io.on('connection', function (socket) {
        socket.emit('news', { hello: 'world; 登陆聊天室成功' });
        socket.on('getARoom', function (obj) {
            socket.room = obj.user_id;
            rooms[obj.user_id] = obj.user_id;
            socket.join(obj.user_id);
        });

        socket.on('msgToOne', function(obj){
            console.log('send1')
            socket.to(obj.theOne_id)
                  .emit('msgFromOne', {       
                                            _id: obj.own_id, 
                                            msgItemContent: obj.message,
                                            avatarUrl: '/static/img/barsang.jpg',
                                            userName: 'test',
                                            msgItemTime: '18/4/5'
                                       })
        });

        socket.on('disconnect', function(reason){
            delete rooms[socket.room] 
            console.log('所有在线房间：',rooms) 
        })
    });
}

module.exports = websocket
