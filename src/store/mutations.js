const SET_USER_INFO = 'SET_USER_INFO' 
const SIGN_OUT = 'SIGN_OUT'
const FIX_USER_INFO = 'FIX_USER_INFO' 	 	 //重置用户性息
const SET_SOCKET = 'SET_SOCKET'              //将socket放入store中，方便页面共享
const INIT_SOCKET = 'INIT_SOCKET'            //想服务器索要房间
const REMOVE_NEW_MSGS = 'REMOVE_NEW_MSGS' 
const ADD_NEW_MSG = 'ADD_NEW_MSG'
const ADD_NEW_MSGS = 'ADD_NEW_MSGS'
const SET_CHAT_MAN = 'SET_CHAT_MAN' 		 //设置当前聊天人性息
const CLEAR_NEW_REPLY = 'CLEAR_NEW_REPLY'



export default {
	[SET_USER_INFO](state, userInfo) {
		state.userInfo = userInfo;
		state.isLogin = true;
	},
	[SIGN_OUT](state) {
		state.userInfo = {};
		state.isLogin = false;
	},
	[FIX_USER_INFO](state, newUserInfo){
		state.userInfo = Object.assign( {}, state.userInfo, newUserInfo )
	},
	[SET_SOCKET](state, socket){
		state.socket = socket
	},
	[INIT_SOCKET](state){
		let socket = state.socket;
		socket.on('news', function( obj ){ //连接成功后服务器推送过来的第一条消息
			console.log(obj)
		});
		socket.on('connect', function (){
			socket.emit('getARoom', {user_id: state.userInfo._id, userName: state.userInfo.userName})
		})
	},
	[ADD_NEW_MSG](state, msg){
		state.newMsgs = [...state.newMsgs, msg]
	},
	[ADD_NEW_MSGS](state, msgs){
		state.newMsgs = [...state.newMsgs, ...msgs];
	},
	[REMOVE_NEW_MSGS](state, msg){ //传入值可能是 消息对象，也可能是字符串 from_id
		let theMsgs = [];
		if ( typeof msg !== 'string'){
			theMsgs = state.newMsgs.filter((item, index, arr)=>{
						return item._id !== msg._id
					});
		}else{
			theMsgs = state.newMsgs.filter((item, index, arr)=>{
						return item.from !== msg
					});
		}
		state.newMsgs = theMsgs;
	},
	[SET_CHAT_MAN](state, chatMan){
		state.chatMan = chatMan
	},
	[CLEAR_NEW_REPLY](state){
		state.userInfo.newReply = [];
	}
}

