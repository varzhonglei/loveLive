const SET_USER_INFO = 'SET_USER_INFO'
const SIGN_OUT = 'SIGN_OUT'
const FIX_USER_INFO = 'FIX_USER_INFO'

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
		state.userInfo = Object.assign( state.userInfo, newUserInfo )
	}
}
