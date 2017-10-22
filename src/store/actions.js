import axios from 'axios'
import Vue from 'vue'
const moment = require('moment')
Vue.use(require('vue-moment'), {
    moment
})
export default {
  signout ({commit}, payload) {
    commit('isLogin', false)
    dbAuth.signOut()
    LocalStorage.clear('userId')
    LocalStorage.clear('name')
    LocalStorage.clear('email')
    LocalStorage.clear('image')
    LocalStorage.clear('phone')
    LocalStorage.clear('address')
    LocalStorage.clear('key')
    router.push('/')
  },
  pullCourse ({commit, state}) {
    if (state.coursepopular == undefined) {
      axios.get('http://172.104.189.169:4000/api/getcourse/popular')
      .then (res => {
        let result = res.data
        commit('addCoursePopular', result)
        commit('addCourse', result)
      })
      axios.get('http://172.104.189.169:4000/api/getcourse/last')
      .then (res => {
        let result = res.data
        commit('addCourseLast', result)
        commit('addCourse', result)
      })
      axios.get('http://172.104.189.169:4000/api/getcourse/price')
      .then (res => {
        let result = res.data
        commit('addCoursePrice', result)
        commit('addCourse', result)
      })
    }
  },
  refreshCourse ({commit, state}) {
    state.course = []
    axios.get('http://172.104.189.169:4000/api/getcourse/popular')
    .then (res => {
      let result = res.data
      commit('addCoursePopular', result)
      commit('addCourse', result)
    })
    axios.get('http://172.104.189.169:4000/api/getcourse/last')
    .then (res => {
      let result = res.data
      commit('addCourseLast', result)
      commit('addCourse', result)
    })
    axios.get('http://172.104.189.169:4000/api/getcourse/price')
    .then (res => {
      let result = res.data
      commit('addCoursePrice', result)
      commit('addCourse', result)
    })

  },
  purchaseCourse ({commit, state}, payload) {
    payload.tstamp = Vue.moment().format('YYYY-MM-DD HH:mm:ss')
    payload.user_id = state.profile.user_id
    console.log('payload ' + JSON.stringify(payload))
    commit('addPurchaseCourse', [payload])
    axios.post('http://172.104.189.169:4000/api/purchase', payload)
  },
  pullLesson ({commit, state}, courseId) {
    axios.get('http://172.104.189.169:4000/api/getlesson/' + courseId)
    .then (res => {
      let result = res.data
      commit('addLesson', result)
    })
  },
  pullLessonRefresh ({commit, state}, courseId) {
    axios.get('http://172.104.189.169:4000/api/getlesson/' + courseId)
    .then (res => {
      let result = res.data
      commit('updateLesson', result)
    })
  },
  addFavorite ({commit, state}, lesson) {
    commit('addFavorite', [lesson])
    console.log(lesson)
    let data = {
      user_id: state.profile.user_id,
      lesson_id: lesson.lesson_id
    }
    console.log(data)
    // axios.post('http://172.104.189.169:4000/api/insertfavorite', data)
  },
  removeFavorite ({commit}, lessonId) {
    commit('removeFavorite', lessonId)
    let data = {
      lesson_id: lessonId
    }
    axios.post('http://172.104.189.169:4000/api/removeFavorite', data)
  },
  loadFavorite ({commit, state}) {
    if (state.favorite.length == 0 || state.favorite == undefined) {
      axios.get('http://172.104.189.169:4000/api/getfavorite/' + state.profile.user_id)
      .then(res => {
        let result = res.data
        commit('addFavorite', result)
      })
    }
  },
  loadMyCourse ({commit, state}) {
    console.log('loadMyCourse: '  + state.purchaseCourse)
    if (state.purchaseCourse.length == 0 || state.purchaseCourse == undefined) {
      console.log('loadMyCourse2')
      axios.get('http://172.104.189.169:4000/api/getuserpurchase/' + state.profile.user_id)
      .then(res => {
        let result = res.data
        commit('addPurchaseCourse', result)
        console.log(result)
      })
    }
  },
  loadLessonFromLessonId ({commit}, lessonId) {
    axios.get('http://172.104.189.169:4000/api/getlesson_from_lesson_id/' + lessonId)
    .then(res => {
      let result = res.data
      commit('addLesson', result)
    })
  },
  SaveCreditCard ({commit}, payload) {
    commit('addCreditCard', payload)
    axios.post('http://172.104.189.169:4000/api/addcreditcard', payload)
  },
  UpdateCreditCard ({commit}, payload) {
    commit('addCreditCard', payload)
    axios.post('http://172.104.189.169:4000/api/updatecreditcard', payload)
  }
}
