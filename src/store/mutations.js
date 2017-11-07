import { LocalStorage } from 'quasar'
export default {
  isLogin (state, payload) {
    state.isLogin = payload
    LocalStorage.set('isLogin', payload)
  },
  addCourse: (state,data) => {
    console.log('addCourse')
    state.course.push(...data)
    LocalStorage.set('course', state.course)
  },
  // addCoursePopular: (state, data) => {
  //   state.coursepopular == undefined ? state.coursepopular = [] : state.coursepopular
  //   state.coursepopular = data
  //   LocalStorage.set('coursepopular', state.coursepopular)
  // },
  // addCourseLast: (state, data) => {
  //   state.courselast == undefined ? state.courselast = [] : state.courselast
  //   state.courselast = data
  //   LocalStorage.set('courselast', state.courselast)
  // },
  // addCoursePrice: (state, data) => {
  //   state.courseprice == undefined ? state.courseprice = [] : state.courseprice
  //   state.courseprice = data
  //   LocalStorage.set('courseprice', state.courseprice)
  // },
  addPurchaseCourse: (state, data) => {
    state.purchaseCourse == undefined ? state.purchaseCourse = [] : state.purchaseCourse
    state.purchaseCourse.push(...data)
    LocalStorage.set('purchaseCourse', state.purchaseCourse)
  },
  addLesson: (state, data) => state.lesson.unshift(...data),
  updateLesson: (state, data) => {
    console.log(state.lesson);
    state.lesson.map((l,index) => {
      data.map(d => {
        l.lesson_id == d.lesson_id ? state.lesson.splice(index, 1) : ''
      })
    })
    console.log(state.lesson);
    state.lesson.unshift(...data)
    console.log(state.lesson);
  },
  addUserProfile: (state, data) =>  {
    state.profile = data
    LocalStorage.set('user_id', data.user_id)
    LocalStorage.set('fname', data.fname)
    LocalStorage.set('lname', data.fname)
    LocalStorage.set('email', data.email)
    LocalStorage.set('phone', data.phone)
    LocalStorage.set('avatar', data.avatar)
    LocalStorage.set('age', data.age)
  },
  addFavorite: (state, data) => {
    state.favorite.unshift(...data)
    LocalStorage.set('favorite', state.favorite)
  },
  removeFavorite: (state, data) => {
    var index = state.favorite.indexOf(data);
    state.favorite.splice(index, 1)
    LocalStorage.set('favorite', state.favorite)
  },
  addCreditCard: (state, data) => {
    console.log('addCreditCard')
    state.creditCard = data
    LocalStorage.set('creditCard', data)
  },
  Logout: (state) => {
    state.isLogin = false
    state.purchaseCourse = []
    state.lesson = []
    state.favorite = []
    state.creditCard = []
    state.course = []
    state.message = []
    LocalStorage.clear()
  },
  addMessage: (state, data) => {
    state.message.push(...data)
    // LocalStorage.set('message', state.message)
  }
}
