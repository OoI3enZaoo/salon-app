import Vue from 'vue'
import Vuex from 'vuex'
import { LocalStorage } from 'quasar'

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    title: 'Home',
    courseList: [],
    number: LocalStorage.get.item('number')
  },
  getters: {
    titleName: state => state.title,
    courseList: state => state.courseList,
    number: state => state.number
  },
  mutations: {
    setTitle (state, payload) {
      state.title = payload
    },
    setCourseList (state, payload) {
      state.courseList = payload
    },
    increaseNumber (state) {
      state.number++
      LocalStorage.set('number', state.number)
    },
    decreaseNumber (state) {
      state.number--
      LocalStorage.set('number', state.number)
    }
  }
})
