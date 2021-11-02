import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
Vue.use(Vuex)

const modules = require.context('./modules', true, '.js$');
modules.keys().forEach(k => {
  console.log(k);
});

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
