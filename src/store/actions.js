import axios from 'axios'
import Vue from 'vue'
const moment = require('moment')
Vue.use(require('vue-moment'), {
    moment
})
export default {
  signout ({commit}, payload) {
    commit('isLogin', false)
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
    if (state.course.length == 0) {
      // axios.get('http://172.104.189.169:4100/api/getcourse/popular')
      // .then (res => {
      //   let result = res.data
      //   commit('addCoursePopular', result)
      //   commit('addCourse', result)
      // })
      axios.get('http://172.104.189.169:4100/api/getcourse/last')
      .then (res => {
        let result = res.data
        // commit('addCourseLast', result)
        commit('addCourse', result)
      })
      // axios.get('http://172.104.189.169:4100/api/getcourse/price')
      // .then (res => {
      //   let result = res.data
      //   commit('addCoursePrice', result)
      //   commit('addCourse', result)
      // })
    }
  },
  refreshCourse ({commit, state}) {
    state.course = []
    // axios.get('http://172.104.189.169:4100/api/getcourse/popular')
    // .then (res => {
    //   let result = res.data
    //   commit('addCoursePopular', result)
    //   commit('addCourse', result)
    // })
    axios.get('http://172.104.189.169:4100/api/getcourse/last')
    .then (res => {
      let result = res.data
      // commit('addCourseLast', result)
      commit('addCourse', result)
    })
    // axios.get('http://172.104.189.169:4100/api/getcourse/price')
    // .then (res => {
    //   let result = res.data
    //   commit('addCoursePrice', result)
    //   commit('addCourse', result)
    // })

  },
  purchaseCourse ({commit, state, getters}, payload) {
    payload.tstamp = Vue.moment().format('YYYY-MM-DD HH:mm:ss')
    console.log('payload ' + JSON.stringify(payload))
    axios.post('http://172.104.189.169:4100/api/purchase', payload)
    commit('addPurchaseCourse', getters.course_from_course_id(payload.course_id))
  },
  loadLessonFromUserId ({commit, state}, user_id) {
    if (state.lesson.length == 0) {
      console.log('loadMyCourse2: ' + user_id)
      axios.get('http://172.104.189.169:4100/api/getuserpurchase/' + user_id)
      .then(res => {
        let result = res.data
        commit('addLesson', result)
        console.log(result)
      })
    }
  },
  pullLesson ({commit, state}, courseId) {
    let isCheck = false
    state.lesson.find(l => l.course_id == courseId ? isCheck = true : '')
    if (isCheck == false) {
      axios.get('http://172.104.189.169:4100/api/getlesson/' + courseId)
      .then (res => {
        console.log('pullLesson')
        let result = res.data
        console.log(result)
        commit('addLesson', result)
      })
    }
  },
  pullVideo ({commit, state}, lesson_id) {
    console.log('pullVideo: ' + lesson_id)
    let isCheck = false
    state.video.find(v => v.lesson_id == lesson_id ? isCheck = true : '')
    if (isCheck == false) {
      axios.get('http://172.104.189.169:4100/api/getvideo/' + lesson_id)
      .then (res => {
        console.log('pullVideo')
        let result = res.data
        console.log(result)
        commit('addVideo', result)
      })
    }
  },
  pullLessonRefresh ({commit, state}, courseId) {
    axios.get('http://172.104.189.169:4100/api/getlesson/' + courseId)
    .then (res => {
      let result = res.data
      commit('updateLesson', result)
    })
  },
  addFavorite ({commit, state}, lesson) {
    commit('addFavorite', [lesson])
    let data = {
      user_id: state.profile.user_id,
      video_id: lesson.video_id
    }
    // state.favorite.map(c => c.lesson_id == lesson.lesson_id ? c.love += 1 : '')
    axios.post('http://172.104.189.169:4100/api/insertfavorite', data)
  },
  removeFavorite ({commit, state}, lessonId) {
    commit('removeFavorite', lessonId)
    let data = {
      user_id: state.profile.user_id,
      video_id: lessonId
    }
    // state.favorite.map(c => c.lesson_id == lessonId ? c.love -= 1 : '')
    axios.post('http://172.104.189.169:4100/api/removeFavorite', data)
  },
  loadFavorite ({commit, state}, user_id) {
    if (state.favorite.length == 0) {
      console.log('loadFavorite: ' + user_id);
      axios.get('http://localhost:4100/api/getfavorite/' + user_id)
      .then(res => {
        let result = res.data
        commit('addFavoriteFirst', result)
      })
    }
  },
  loadLessonFromLessonId ({commit}, lessonId) {
    axios.get('http://172.104.189.169:4100/api/getlesson_from_lesson_id/' + lessonId)
    .then(res => {
      let result = res.data
      commit('addLesson', result)
      console.log('loadLessonFromLessonId')
    })
  },
  // addCourseView ({commit, state}, course_id) {
  //   console.log('course_id : ' + course_id)
  //   let data = {
  //     course_id: course_id
  //   }
  //   axios.post('http://172.104.189.169:4100/api/addCourseview', data)
  //   state.course.map(c => c.course_id == course_id ? c.view == null ? c.view = 1 : c.view += 1 : '')
  // },
  // addLessonView ({commit, state}, lesson_id) {
  //   console.log('lesson_id : ' + lesson_id)
  //   let data = {
  //     lesson_id: lesson_id
  //   }
  //   axios.post('http://172.104.189.169:4100/api/addlessonview', data)
  //   state.lesson.map(c => c.lesson_id == lesson_id ? c.view == null ? c.view = 1 : c.view += 1 : '')
  // },
  sendMessage ({commit}, payload) {
    console.log('payload: ' + JSON.stringify(payload))
    axios.post('http://172.104.189.169:4100/api/addchat', payload)
  },
  getLastChat ({commit}, user_id) {
    axios.get('http://172.104.189.169:4100/api/getlastuserchat/' + user_id)
    .then(res => {
      let result = res.data
      commit('addMessage', result)
    })
  },
  addUserRecommend ({commit}, user_id) {
    const data = {
      user_id: user_id,
      tstamp: Vue.moment().format('YYYY-MM-DD HH:mm:ss')
    }
    console.log(data);
    axios.post('http:///172.104.189.169:4100/api/addrecommend', data)
  }
}
