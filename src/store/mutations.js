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
    console.log('addPurchaseCourse: ' + JSON.stringify(data))
    console.log('state.purchaseCourse: ' + state.purchaseCourse)
    state.purchaseCourse == undefined ? state.purchaseCourse = [] : state.purchaseCourse
    state.purchaseCourse.push(...data)
    LocalStorage.set('purchaseCourse', state.purchaseCourse)
  },
  addLesson: (state, data) => state.lesson.unshift(...data),
  addVideo: (state, data) => state.video.unshift(...data),
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
    state.lesson.find(l => {
      if (l.lesson_id == data[0].lesson_id) {
        data[0].course_id = l.course_id
        data[0].avatar = l.avatar
        data[0].fname = l.fname
        data[0].lname = l.lname
        console.log('data[0]: ' + JSON.stringify(data[0]));
        state.favorite.unshift(...data)
      }
    })
  },
  addFavoriteFirst: (state, data) => {
    state.favorite.unshift(...data)
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
    // state.course = []
    state.message = []
    LocalStorage.clear()
  },
  addMessage: (state, data) => {
    state.message.push(...data)
    // LocalStorage.set('message', state.message)
  }
}
