const SET_USER_INFO = 'SET_USER_INFO' 
const SIGN_OUT = 'SIGN_OUT'
const FIX_USER_INFO = 'FIX_USER_INFO' 	 	 //重置用户性息
const SET_SOCKET = 'SET_SOCKET'              //将socket放入store中，方便页面共享
const INIT_SOCKET = 'INIT_SOCKET'            //想服务器索要房间
const RESET_SOCKET = 'RESET_SOCKET' 
const SET_CHAT_MAN = 'SET_CHAT_MAN' 		 //设置当前聊天人性息


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
		socket.on('news', function( obj ){
			console.log(obj)
		});
		socket.emit('getARoom', {user_id: state.userInfo._id})
	},
	[RESET_SOCKET](state){
		let socket = state.socket;
		socket.on('msgFromOne', function( obj ){
			console.log(obj)
		});
	},
	[SET_CHAT_MAN](state, chatMan){
		state.chatMan = chatMan
	}
}

