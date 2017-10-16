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

    <div column v-for="(data,index) in $store.state.course" :key="index">
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
        </div>
      <bottomNav></bottomNav>
</div>
</template>
<script>
import cardCourse from '../components/cardCourse.vue'
import Vue from 'vue'
export default {
  beforeCreate () {
    this.$store.dispatch('pullCourse')
  },
  mounted () {
    // console.log(Vue.cordova.plugins)
    // Vue.cordova.plugins.backgroundMode.enable()
    // this.$options.sockets.course = (data) => {
    //     this.$store.commit('addCourseContent', data)
    //     console.log('socket1')
    // }
    // Vue.cordova.on('deviceready', () => {
    //   Vue.cordova.plugins.backgroundMode.enable();
    //   console.log('dfdf');
    // });

    // Vue.cordova.plugins.backgroundMode.on('EVENT', function(){
    //   this.$options.sockets.course = (data) => {
    //     console.log('socket2')
    //       Vue.cordova.plugins.backgroundMode.setDefaults({
    //         title: 'testtest',
    //         text: 'socket2',
    //         icon: 'cancel', // this will look for icon.png in platforms/android/res/drawable|mipmap
    //         color: 'F14F4D', // hex format like 'F14F4D'
    //         resume: true,
    //         hidden: true,
    //         bigText: true
    //     })
    //     this.$store.commit('addCourse', [data])
    //   }
    // })

    //
    // document.addEventListener('deviceready', function () {
    //   Vue.cordova.plugins.backgroundMode.enable();
    //   console.log('backgroundMode: ' + Vue.cordova.plugins.backgroundMode.isActive())
    //
    // }, false);
    // console.log('backgroundMode: ' + Vue.cordova.plugins.backgroundMode.isActive())
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
  },
  computed: {
    loading () {
      return this.$store.state.loading
    }
  }
}
</script>
