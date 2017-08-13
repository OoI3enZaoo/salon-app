<template>
<div>
    <q-pull-to-refresh :handler="refresher" >
      <div class="layout-padding">
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
      <br> <br>
    </q-pull-to-refresh>   



</div>
</template>

<script>
export default {
  computed: {
    couseList () {
      return this.$store.getters.courseList
    }
  },
  data () {
    return {
      newCourseList: []
    }
  },
  methods: {
    refresher (done) {
      this.axios.get('https://salon-b177d.firebaseio.com/courses.json')
      .then(res => {
        let result = res.data
        console.log('res: ' + Object.keys(result).length)
        let fireLength = Object.keys(res.data).length
        let storeLength = Object.keys(this.couseList).length
        if (fireLength === storeLength) {
          console.log('old data')
          done()
        }
        else {
          console.log('new data from firebase')
          for (let key in result) {
            this.newCourseList.push(result[key])
          }
          this.$store.commit('setCourseList', this.newCourseList)
          done()
        }
      })
    }
  }
}
</script>
