<template>
<div>

  <cardCourse></cardCourse>
  <div class="layout-padding">
      <button class="primary small" @click="increaseNumber">+</button>
      <button class="primary small" @click="decreaseNumber">-</button>
  </div>

    <h4>Number => {{this.$store.getters.number}}</h4>
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
  },
  methods: {
    increaseNumber () {
      this.$store.commit('increaseNumber')
    },
    decreaseNumber () {
      this.$store.commit('decreaseNumber')
    }
  }
}
</script>
