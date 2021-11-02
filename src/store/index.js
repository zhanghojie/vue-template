import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
Vue.use(Vuex)

const files = require.context('./modules', true, /\.js$/);
const modules = files.keys().reduce((module, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = files(modulePath);
  module[moduleName] = value.default || value;
  return module
}, {})
const store = new Vuex.Store({
  modules: {
    ...modules
  },
  getters
})

export default store
