import Vue from 'vue'
import Vuex from 'vuex'
import { LocalStorage, Toast } from 'quasar'
import { dbAuth, db } from '../firebase'
import router from './router'
Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    title: 'Home',
    page2: false,
    courseList: LocalStorage.get.item('courseList'),
    course: {},
    isLogin: LocalStorage.get.item('isLogin'),
    user: {
      userId: LocalStorage.get.item('userId'),
      name: LocalStorage.get.item('name'),
      email: LocalStorage.get.item('email'),
      image: 'https://www.shareicon.net/download/2016/05/29/772558_user_512x512.png',
      phone: LocalStorage.get.item('phone'),
      address: LocalStorage.get.item('address'),
      key: LocalStorage.get.item('key'),
    },
    myCourse: LocalStorage.get.item('myCourse')
  },
  getters: {
    title: state => state.title,
    courseList: state => state.courseList,
    number: state => state.number,
    course: state => state.course,
    isLogin: state => state.isLogin,
    user: state => state.user,
    page2: state => state.page2,
    myCourse: state => state.myCourse
  },
  mutations: {
    setTitle (state, payload) {
      state.title = payload
    },
    setCourseList (state, payload) {
      state.courseList = payload
      LocalStorage.set('courseList', payload)
    },
    addCourseList (state, payload) {
      if(state.courseList != null) {
            let oldData = state.courseList
            state.courseList.push(payload)
             LocalStorage.set('courseList', state.courseList)
      } else {
        state.courseList = payload
         LocalStorage.set('courseList', state.courseList)
      }
    },
    addMyCourse (state, payload) {
          let myOldCourse = state.myCourse
          if(myOldCourse != null) {
            myOldCourse.push(payload)
            LocalStorage.set('myCourse', myOldCourse)
          } else {
            myOldCourse = payload
          }
    },
    removeCouse (state, payload) {
        state.courseList.map((data,index) => {
          console.log('data.key: ' + data.key + ' payload: ' + payload);
          if(data.key == payload){
            console.log('true')
            state.courseList.splice(index,1)
          }else{
             console.log('not ture')
          }
          console.log('index: ' + index);
        })
        console.log('data: ' + state.courseList + ' typeof: ' + typeof state.courseList);

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
      LocalStorage.set('phone', payload.phone)
      LocalStorage.set('image', payload.image)
      LocalStorage.set('address', payload.address)
    },
    setPage2 (state, payload) {
      state.page2 = payload
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
            let newData = db.ref('users').child(newUser.key)
            console.log('check: ' + newData)
            newData.update({
              key: newUser.key
            })
            commit('setUserOnline', newUser)
            commit('isLogin', true)
            router.push('/home')
            Toast.create.positive(
              {
                html: 'ยินดีต้อนรับสมาชิกใหม่ เลือกคอร์สที่สนใจได้เลย !!',
                icon: 'done',
                timeout: 2500
              }
            )
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
            console.log('user: ' + JSON.stringify(user))
            let ref = db.ref('users').on('value', snapshot => {
              let newData = snapshot.val()
              let dataArray = Object.keys(newData).map(item => newData[item])
              dataArray.forEach(res => {
                console.log('res: ' + JSON.stringify(res))
                if (res.userId === user.uid) {
                  console.log('match: ' + JSON.stringify(res))
                  commit('setUserOnline', res)
                  commit('isLogin', true)
                  router.push('/home')
                  Toast.create.positive(
                    {
                      html: 'ยินดีต้อนรับกลับมานะ',
                      icon: 'done',
                      timeout: 2500
                    }
                  )
                }
                else {
                  console.log('not match')
                }
              })
            })
            console.log('ref: ' + ref)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
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
    }
  }
})
