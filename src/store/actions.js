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
    if (state.course == undefined) {
      axios.get('http://172.104.189.169:4000/api/getcourse')
      .then (res => {
        let result = res.data
        console.log('pullCourse: ' + JSON.stringify(result))
        commit('addCourse', result)
      })
    }
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
  }
}
