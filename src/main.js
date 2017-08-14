// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import {store} from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import toolbar from './components/toolbar.vue'
import tabs from './components/tabs.vue'
Vue.use(Quasar) // Install Quasar Framework
Vue.use(VueAxios, axios)

Vue.component('mToolbar', toolbar)
Vue.component('tabs', tabs)

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    store,
    router,
    render: h => h(require('./App'))
  })
})
