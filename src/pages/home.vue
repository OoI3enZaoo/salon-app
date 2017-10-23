<template>
<div>

    <toolbar v-if="$store.state.isLogin == true" title="รายการคอร์ส" :back="false"></toolbar>
    <toolbar v-else title="รายการคอร์ส" :back="true" link="/"></toolbar>
  <div v-show="$store.state.isLogin !== true">
  <v-alert


      v-bind:value="true"
  >
      คุณยังไม่ได้ลงทะเบียนเลยนะ <v-btn primary @click.native="$router.push('/login')">ลงทะเบียน</v-btn>
  </v-alert>
</div>



<v-tabs dark fixed centered>
    <v-tabs-bar class="primary">
      <v-tabs-slider color="yellow"></v-tabs-slider>
     <v-tabs-item
       v-for="(data,i) in menuItems"
       :key="i"
       :href="'#tab-' + i"
     >
       {{data.title}}
     </v-tabs-item>
   </v-tabs-bar>

   <v-tabs-items>
     <!-- ล่าสุด -->
     <v-tabs-content id='tab-0'>
        <last></last>
     </v-tabs-content>
     <!-- นิยม -->
     <v-tabs-content id='tab-1'>
        <popular></popular>
     </v-tabs-content>

     <!-- ราคา -->
     <v-tabs-content id='tab-2'>
        <price></price>
     </v-tabs-content>
     </v-tabs-items>
   </v-tabs>

    <!-- <div column v-for="(data,index) in $store.state.course" :key="index">
              <cardCourse
                @progress="checkProgress"
                :courseId="data.course_id"
                :cover="data.cover"
                :title ="data.title"
                :price="data.price"
                :lname="data.lname"
                :fname="data.fname"
                :description="data.description"
            ></cardCourse>
        </div> -->
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
    }
  }
}
</script>
