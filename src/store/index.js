import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex);

const state = {
    userInfo: {},
	isLogin: false,
	socket: {},
	chatMan: {},
	newMsgs: []
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters
})
