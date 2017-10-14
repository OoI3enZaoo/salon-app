import { LocalStorage } from 'quasar'
export default {
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
    LocalStorage.set('phone', payload.phone)
    LocalStorage.set('image', payload.image)
    LocalStorage.set('address', payload.address)
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
  addLesson: (state, data) => state.lesson.unshift(...data)
}
