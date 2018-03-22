import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
    userInfo: {},
	isLogin: false,
	test: 'leileigegeshuai'
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})