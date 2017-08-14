import Vue from 'vue'
import VueRouter from 'vue-router'
import introduce from './pages/introduce.vue'
import homePage from './pages/home.vue'
import courseContent from './pages/courseContent.vue'
import bookmark from './pages/bookmark.vue'
import message from './pages/message.vue'
import account from './pages/account.vue'
import login from './pages/login.vue'
import createAccount from './pages/createAccount.vue'
import signin from './pages/signin.vue'
Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    { path: '/', component: introduce },
    { path: '/login', component: login },
    { path: '/home', component: homePage }, // Default
    { path: '/courseContent/:id', component: courseContent },
    { path: '/bookmark', component: bookmark },
    { path: '/message', component: message },
    { path: '/account', component: account },
    { path: '/createAccount', component: createAccount },
    { path: '/signin', component: signin },
    { path: '*', component: load('Error404') } // Not found
  ]
})
