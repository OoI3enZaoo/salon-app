<template>
<div>

  <!-- <mToolbar title="รายการ"></mToolbar>       -->
  <div class="text-xs-center"  v-show="prog" >
    <br>
    <v-progress-circular indeterminate class="primary--text" ></v-progress-circular>
  </div>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex v-for="(data,index) in courseRef" :key="index">
          <template>
              <cardCourse
                @progress="checkProgress"
                :index="index"
                :length="courseRef.length"
                :id="data.key"
                :cover="data.cover"
                :name ="data.name"
                :price="data.price"
                :snippet="data.snippet"
            ></cardCourse>
          </template>

      </v-flex>

  </v-layout>

  </v-container>
      <br><br><br>
</div>
</template>
<script>
import cardCourse from '../components/cardCourse.vue'
// const moment = require('moment')
import {db} from '../../firebase'
let courseRef = db.ref('courses')
export default {
  firebase: {
    courseRef
  },
  created() {
    console.log("courseRef.length: " + Object.keys(courseRef).length);
    this.$store.commit('setTitle', 'รายการคอร์ส')

    // if (this.couseList == null) {
    //   this.axios.get('https://salon-b177d.firebaseio.com/courses.json')
    //     .then(res => {
    //       let result = res.data
    //       for (let key in result) {
    //         result[key].key = key
    //         console.log('result: ' + JSON.stringify(result[key].name))
    //         this.courseList.push(result[key])
    //       }
    //       this.$store.commit('setCourseList', this.courseList)
    //       console.log('course: ' + this.$store.getters.courseList)
    //     })
    //   console.log('load from Firebase')
    // } else {
    //   console.log('load from LocalStorage')
    // }
  },
  mounted() {
    // this.$options.sockets.newCardData = (res) => {
    //   console.log(JSON.stringify(res))
    //   this.$store.commit('addCourseList', res)
    // }
    // this.$options.sockets.removeCourse = (key) => {
    //   console.log('removeCourse: ' + key)
    //   this.$store.commit('removeCouse', key)
    // }
  },
  components: {
    cardCourse
  },
  methods: {
    checkProgress(select) {
      console.log('select');
      this.prog = select
    }
  },
  data() {
    return {
      prog: true
    }
  }
}
</script>
