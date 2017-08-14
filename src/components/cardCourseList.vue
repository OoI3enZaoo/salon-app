<template>
<div>

    <q-pull-to-refresh :handler="refresher" >
      <div class="layout-padding">
        <div class="text-center">
          <i></i><small class ="text-grey-6"><i>arrow_downward</i>&nbsp;เลื่อนลงเพื่ออัพเดทข้อมูลใหม่ๆ</small>
        </div>
        <br>
        <template v-for="data in couseList">
          <router-link :to="'/courseContent/'+data.key">
              <div class="card">
                <q-parallax :src="data.cover" :height="150">
                    <div slot="loading">Loading...</div>
                </q-parallax>
                <div class="card-content">
                  <b><p v-html="data.name"style="margin-bottom:10px;"></p></b>
                  <div class="text-grey-8">
                    {{data.snippet}}
                  </div>
                  <p class="text-primary" style="margin-top:10px;">THB{{data.price}}</p>
                </div>
              </div>
            </router-link>
            </template>
      </div>
    </q-pull-to-refresh>
</div>
</template>

<script>
import { Toast } from 'quasar'
export default {
  computed: {
    couseList () {
      return this.$store.getters.courseList
    }
  },
  methods: {
    refresher (done) {
      let newCourseList = []
      this.axios.get('https://salon-b177d.firebaseio.com/courses.json')
      .then(res => {
        let result = res.data
        for (let key in result) {
          newCourseList.push(result[key])
        }
        if (JSON.stringify(newCourseList) === JSON.stringify(this.couseList)) {
          console.log('old data')
          Toast.create({
            html: 'load data from store',
            icon: 'alarm_add',
            timeout: 2500
          })
          done()
        }
        else {
          console.log('new data from firebase')
          Toast.create({
            html: 'load data from firebase',
            icon: 'alarm_add',
            timeout: 2500
          })
          this.$store.commit('setCourseList', newCourseList)
          done()
          newCourseList = []
        }
      })
    }
  }
}
</script>
