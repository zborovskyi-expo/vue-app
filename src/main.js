
import Vue from 'vue'

import App from './App'

import router from './router'

import VueTruncate from 'vue-truncate-filter'

import Vuetify from 'vuetify'

import 'babel-polyfill'

Vue.use(VueTruncate)

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
