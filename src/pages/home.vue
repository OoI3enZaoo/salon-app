<template>
<div>

    <toolbar v-if="$store.state.isLogin == true" title="รายการคอร์ส" :back="false"></toolbar>
    <toolbar v-else title="รายการคอร์ส":back="false" ></toolbar>

<router-link to="/login/home" tag="span" v-if="$store.state.isLogin !== true">
  <v-card>
    <v-list>
      <v-list-tile>
        <v-list-tile-avatar>
          <v-icon primary>home</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-content>
            เข้าสู่ระบบ/สมัครสมาชิก
          </v-list-tile-content>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon primary>keyboard_arrow_right</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>
</router-link>
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
