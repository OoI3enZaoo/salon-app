import Vue from 'vue'
import Vuex from 'vuex'
import { LocalStorage } from 'quasar'
import { dbAuth, db } from '../firebase'
import router from './router'

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    title: 'Home',
    courseList: LocalStorage.get.item('courseList'),
    course: {},
    isLogin: LocalStorage.get.item('isLogin'),
    user: {
      userId: LocalStorage.get.item('userId'),
      name: LocalStorage.get.item('name'),
      email: LocalStorage.get.item('email'),
      image: LocalStorage.get.item('image'),
      phone: LocalStorage.get.item('phone'),
      address: LocalStorage.get.item('address'),
      key: LocalStorage.get.item('key')
    }
  },
  getters: {
    title: state => state.title,
    courseList: state => state.courseList,
    number: state => state.number,
    course: state => state.course,
    isLogin: state => state.isLogin,
    user: state => state.user
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
    },
    setUserOnline (state, payload) {
      state.user = payload
      LocalStorage.set('userId', payload.userId)
      LocalStorage.set('name', payload.name)
      LocalStorage.set('email', payload.email)
      LocalStorage.set('key', payload.key)
    }
  },
  actions: {
    signUserUp ({commit}, payload) {
      dbAuth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          useraa => {
            return useraa
          }
        ).then(
          user => {
            const newUser = {
              userId: user.uid,
              email: user.email,
              name: payload.name
            }
            console.log('newUser: ' + JSON.stringify(newUser))
            const newRef = db.ref('users').push(newUser)
            newUser.key = newRef.getKey()
            commit('setUserOnline', newUser)
            commit('isLogin', true)
            router.push('/home')
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      dbAuth.signInWithEmailAndPassword(payload.email, payload.password)
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
    signout ({commit}, payload) {
      dbAuth.signOut()
      LocalStorage.clear('userId')
      LocalStorage.clear('name')
      LocalStorage.clear('email')
      LocalStorage.clear('image')
      LocalStorage.clear('phone')
      LocalStorage.clear('address')
      LocalStorage.clear('key')
      commit('isLogin', false)
    }
  }
})
