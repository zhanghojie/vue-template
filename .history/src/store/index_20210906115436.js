import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
Vue.use(Vuex)

const modules = require.context('./modules', false, /\.js$/);
const moduless = modules.keys().reduce((module, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  console.log("🚀 ~ moduless ~ moduleName", moduleName);
  const value = modules(modulePath);
  console.log("🚀 ~ moduless ~ value", value);

  moduless[moduleName] = value.default
  return moduless
}, {})
console.log(moduless);
const store = new Vuex.Store({
  modules: {
    app: {
      namespaced: true,
      ...app
    }
  },
  getters
})

export default store
