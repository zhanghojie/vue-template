import Vue from 'vue'
import * as filter from './filter'

Object.keys(filter).forEach(k => Vue.filter(k, filter[k]))
console.log(filter, 'filter');

Vue.prototype.$formatDate = Vue.filter('formatDate')
Vue.prototype.$hidePhone = Vue.filter('hidePhone')
