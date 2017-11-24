<template>
<div>

    <toolbar v-if="$store.state.isLogin == true" title="รายการคอร์ส" :back="false"></toolbar>
    <toolbar v-else title="รายการคอร์ส":back="false" ></toolbar>


<v-card color="blue white--text"v-if="$store.state.isLogin !== true">
  <v-card-text>
    สมัครสมาชิก เพื่อเลือกซื้อคอร์สเลย <br>
    <v-btn color="white" @click.native="$router.push('/login/home')">เข้าสู่ระบบ</v-btn>
    <v-btn color="primary" @click.native="$router.push('/register/home')" >สมัครสมาชิก</v-btn>
  </v-card-text>
</v-card>

<br><br>
<q-pull-to-refresh :handler="refresher" pull-message = "" release-message="ปล่อยมือเพื่อโหลด" refresh-message="โหลดข้อมูล" >
   <div column v-for="(data, index) in course" :key="index">
             <cardCourse
               :data="data"
           ></cardCourse>
   </div>
   <div style="height:50px;"></div>

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
        { title: 'ราคา' }
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
