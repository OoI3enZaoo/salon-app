import Vue from 'vue'
import Vuex from 'vuex'
import { LocalStorage } from 'quasar'
import { dbAuth } from '../firebase'

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    title: 'Home',
    courseList: LocalStorage.get.item('courseList'),
    course: {},
    isLogin: LocalStorage.get.item('isLogin'),
    user: {
      userId: LocalStorage.get.item('userId'),
      firstName: LocalStorage.get.item('firstName'),
      lastName: LocalStorage.get.item('lastName'),
      email: LocalStorage.get.item('email'),
      image: LocalStorage.get.item('image'),
      phone: LocalStorage.get.item('phone'),
      address: LocalStorage.get.item('address')
    }
  },
  getters: {
    title: state => state.title,
    courseList: state => state.courseList,
    number: state => state.number,
    course: state => state.course,
    isLogin: state => state.isLogin
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
    },
    isLogin (state, payload) {
      state.isLogin = payload
      LocalStorage.set('isLogin', payload)
    }
  },
  actions: {
    setLogin ({commit, state}, payload) {

    },
    signUserUp ({commit}, payload) {
      dbAuth.createUserWithEmailAndPassword('teerapath@hotmail.com', '123456789')
        .then(
          user => {
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            console.log('user: ' + newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      dbAuth.signInWithEmailAndPassword('teerapath@hotmail.com', '123456789')
        .then(
          user => {
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            console.log('user: ' + newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    }
  }
})
