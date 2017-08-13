import Vue from 'vue'
import Vuex from 'vuex'
import { LocalStorage } from 'quasar'

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    title: 'Home',
    courseList: LocalStorage.get.item('courseList'),
    course: {}
  },
  getters: {
    title: state => state.title,
    courseList: state => state.courseList,
    number: state => state.number,
    course: state => state.course
  },
  mutations: {
    setTitle (state, payload) {
      state.title = payload
    },
    setCourseList (state, payload) {
      state.courseList = payload
      LocalStorage.set('courseList', payload)
    },
    findCourse (state, payload) {
      state.courseList.filter(res => {
        if (res.key === payload) {
          state.course = res
        }
      })
    }
  }
})
