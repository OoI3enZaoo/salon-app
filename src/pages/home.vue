<template>
<div >

      <!-- <mToolbar title="รายการ"></mToolbar>       -->
        <cardCourse></cardCourse>
</div>
</template>
<script>
import cardCourse from '../components/cardCourseList.vue'
// const moment = require('moment')


export default {
  created () {
    this.$store.commit('setTitle', 'รายการคอร์ส')
    if (this.couseList == null) {
      this.axios.get('https://salon-b177d.firebaseio.com/courses.json')
      .then(res => {
        let result = res.data
        for (let key in result) {
          result[key].key = key
          console.log('result: ' + JSON.stringify(result[key].name))
          this.courseList.push(result[key])
        }
        this.$store.commit('setCourseList', this.courseList)
        console.log('course: ' + this.$store.getters.courseList)
      })
      console.log('load from Firebase')
    }
    else {
      console.log('load from LocalStorage')
    }

  },
  mounted () {
      this.$options.sockets.newCardData = (res) => {
      console.log(JSON.stringify(res))
      this.$store.commit('addCourseList', res)
    }
      this.$options.sockets.removeCourse = (key) => {
      console.log('removeCourse: ' + key)
      this.$store.commit('removeCouse', key)
    }
  },
  components: {
    cardCourse
  },
  data () {
    return {
      courseList: []
    }
  },
  computed: {
    couseList () {
      return this.$store.getters.courseList
    }
  }
}
</script>
