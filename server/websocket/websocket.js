
var UserModel = require('../mongoose/users/UserModel');
var Dialogue = require('../mongoose/dialogue/dialogueModel')
var Message = require('../mongoose/message/messageModel')


function websocket (server){
    var io = require('socket.io')(server)
    var rooms = {};
    io.on('connection', function (socket) {
        socket.emit('news', { hello: 'world; 登陆聊天室成功' });
        socket.on('getARoom', function (obj) { //以用户_id做为房间名得到一个房间
            socket.room = obj.user_id;
            rooms[obj.user_id] = obj.userName;
            socket.join(obj.user_id);
            console.log( obj.userName, 'being online'); 
            console.log('all online：', rooms, '\n') 
        });

        //发送消息步骤：1存储消息， 2发送消息， 
        socket.on('msgToOne', async function msgToOne(obj){ 
            let to = obj.theOne_id,
                from = obj.own_id,
                msgItemContent = obj.message,//消息内容
                date = obj.date,//消息日期
                theTwo = to < from ? to + from : from + to,//无论谁给谁发消息，确保索引相同
                message_id, 
                avatarUrl, //发布者头像
                userName;  //发布者用户
            let newMessage = new Message({
                to: to, 
                from: from, 
                msgItemContent: msgItemContent,
                date: date
            });
            message_id = newMessage._id;
            let theDialogue = await Dialogue.findOne({theTwo: theTwo}); //未找到返回null
            if ( theDialogue && rooms.hasOwnProperty(to) ){ // 有过会话,并且对方在线
                theDialogue.messages.push(message_id);
                await theDialogue.save(); 
            }else{
                if ( !theDialogue ) { 
                    //从未有过会话
                    let newDialogue = new Dialogue({theTwo: theTwo});
                    newDialogue.messages.push(message_id);
                    await newDialogue.save();
                } 
                let theOne = await UserModel.findOne({_id: to});
                theOne.offLineMessages.push({msg_id:message_id, theOne_id: from});
                await theOne.save();
            }
            await newMessage.save(); 
            let theUser = await UserModel.findOne({_id: from}).select({avatarUrl:1, userName: 1});
            avatarUrl = theUser.avatarUrl;
            userName = theUser.userName;
            socket.to(to)
                  .emit('msgFromOne', {     
                            _id: message_id,
                            from: from, 
                            msgItemContent: msgItemContent,
                            avatarUrl: avatarUrl,
                            userName: userName,
                            msgItemTime: date,
                        });
            socket.emit('sendSuccess', { date: date })
        } );

        socket.on('disconnect', function(reason){
            console.log( rooms[socket.room],'being offline');
            delete rooms[socket.room];
            console.log('all online：', rooms, '\n') 
        })
    });
}


module.exports = websocket
