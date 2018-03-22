const SET_USER_INFO = 'SET_USER_INFO';

export default {
	[SET_USER_INFO](state, userInfo) {
		state.userInfo = userInfo;
		state.isLogin = true;
	}
}