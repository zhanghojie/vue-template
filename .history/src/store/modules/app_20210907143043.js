const state = {
  userName: '',
  zfid: ''
}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  SET_ZFID(state, payload) {
    state.zfid = payload;
  }
}
const actions = {
  // 设置name
  setUserName({ commit }, name) {
    commit('SET_USER_NAME', name)
  }
}
export default {
  state,
  mutations,
  actions
}