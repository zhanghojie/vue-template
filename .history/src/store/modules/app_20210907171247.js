const state = {
  userName: '',
  zfid: '',
  userId: ''
}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  SET_ZFID(state, payload) {
    state.zfid = payload;
  },
  SET_USER_ID(state, payload) {
    state.userId = payload;
  }
}
const actions = {
  // 设置name
  setUserName({ commit }, name) {
    commit('SET_USER_NAME', name)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}