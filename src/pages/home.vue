<template>
<div>

  <cardCourse></cardCourse>

</div>

</template>

<script>
import cardCourse from '../components/cardCourseList.vue'
export default {
  created () {
    this.$store.commit('setTitle', 'รายการคอร์ส')
    this.axios.get('https://salon-b177d.firebaseio.com/courses.json')
    .then(res => {
      let result = res.data
      for (let key in result) {
        console.log('result: ' + JSON.stringify(result[key].name))
        this.courseList.push(result[key])
      }
      this.$store.commit('setCourseList', this.courseList)
      console.log('course: ' + this.$store.getters.courseList)
    })
  },
  components: {
    cardCourse
  },
  data () {
    return {
      courseList: []
    }
  }
}
</script>
