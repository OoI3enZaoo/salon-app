<template>
<div>

    <toolbar v-if="$store.state.isLogin == true" title="รายการคอร์ส" :back="false"></toolbar>
    <toolbar v-else title="รายการคอร์ส" :back="true" link="/"></toolbar>

    <div v-show="$store.state.isLogin !== true">
      <v-alert v-bind:value="true">
          คุณยังไม่ได้ลงทะเบียนเลยนะ <v-btn primary @click.native="$router.push('/login')">ลงทะเบียน</v-btn>
      </v-alert>
  </div>
<br><br>
<q-pull-to-refresh :handler="refresher">
   <div class="text-xs-center">
     <br>
     <p class="grey--text">-- รายการคอร์สที่ถูกสร้างล่าสุด --</p>
   </div>
   <div column v-for="(data,index) in course" :key="index">
             <cardCourse
               :data="data"
           ></cardCourse>
   </div>
</q-pull-to-refresh>

      <bottomNav></bottomNav>
</div>
</template>
<script>
import {
  QPullToRefresh,
  Toast
} from 'quasar'
import cardCourse from '../components/cardCourse.vue'
import last from '../components/course/last.vue'
import popular from '../components/course/popular.vue'
import price from '../components/course/price.vue'
import Vue from 'vue'
export default {
  beforeCreate () {
    this.$store.dispatch('pullCourse')
    this.$store.dispatch('loadMyCourse')
    this.$socket.emit('subscribe', this.$store.state.profile.user_id)
    this.$store.dispatch('getLastChat', this.$store.state.profile.user_id)
  },
  components: {
    cardCourse,
    QPullToRefresh,
    Toast,
    last,
    popular,
    price
  },
  methods: {
    checkProgress(select) {
      console.log('select');
      this.prog = select
    },
    refresher (done) {
      this.$store.dispatch('refreshCourse')
      done()
    }
  },
  data() {
    return {
      prog: true,
      menuItems: [
        { title: 'ล่าสุด' },
        { title: 'ความนิยม' },
        { title: 'ราคา' },
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    course () {
      return this.$store.state.course
    }
  }
}
</script>
