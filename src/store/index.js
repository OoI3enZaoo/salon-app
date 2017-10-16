import Vue from 'vue'
import Vuex from 'vuex'
import { LocalStorage, Toast } from 'quasar'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
      page2: false,
      isLogin: LocalStorage.get.item('isLogin'),
      profile: {
        user_id: LocalStorage.get.item('user_id'),
        fname: LocalStorage.get.item('fname'),
        lname: LocalStorage.get.item('lname'),
        email: LocalStorage.get.item('email'),
        avatar: 'https://www.shareicon.net/download/2016/05/29/772558_user_512x512.png',
        address: LocalStorage.get.item('address'),
        phone: LocalStorage.get.item('phone'),
        age: LocalStorage.get.item('age')
      },
      purchaseCourse: LocalStorage.get.item('purchaseCourse') == undefined ? [] : LocalStorage.get.item('purchaseCourse'),
      course: LocalStorage.get.item('course'),
      lesson: LocalStorage.get.item('lesson') == undefined ? [] : LocalStorage.get.item('lesson')
    },
    getters,
    mutations,
    actions
  })
