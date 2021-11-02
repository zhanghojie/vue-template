const state = {
  userName: '',
  userInfo: {}
}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },


  set_userInfo(state, payload) {
    state.userInfo = payload;
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