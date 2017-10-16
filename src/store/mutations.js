import { LocalStorage } from 'quasar'
export default {
  isLogin (state, payload) {
    state.isLogin = payload
    LocalStorage.set('isLogin', payload)
  },
  addCourse: (state,data) => {
    console.log('addCourse')
    state.course == undefined ? state.course = [] : ''
    state.course.push(...data)
    LocalStorage.set('course', state.course)
  },
  addPurchaseCourse: (state, data) => {
    state.purchaseCourse == undefined ? state.purchaseCourse = [] : ''
    state.purchaseCourse.push(...data)
    LocalStorage.set('purchaseCourse', state.purchaseCourse)
  },
  addLesson: (state, data) => state.lesson.unshift(...data),
  addUserProfile: (state, data) =>  {
    state.profile = data
    LocalStorage.set('user_id', data.user_id)
    LocalStorage.set('fname', data.fname)
    LocalStorage.set('lname', data.fname)
    LocalStorage.set('email', data.email)
    LocalStorage.set('phone', data.phone)
    LocalStorage.set('avatar', data.avatar)
    LocalStorage.set('age', data.age)
  }
}
