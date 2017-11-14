<template>
  <div>
    <toolbar v-if="$store.state.isLogin == true" title="บัญชีของฉัน" :back="false"></toolbar>
    <toolbar v-else title="รายการคอร์ส" :back="true" link="/"></toolbar>
    <v-card color="blue white--text"v-if="$store.state.isLogin !== true">
      <v-card-text>
        สมัครสมาชิก เพื่อทำการซื้อคอร์สได้เลย <br>
        <v-btn color="white" @click.native="$router.push('/login/profile')">เข้าสู่ระบบ</v-btn>
        <v-btn color="primary" @click.native="$router.push('/register/profile')" >สมัครสมาชิก</v-btn>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-media src="https://cdn.dribbble.com/users/136211/screenshots/2008336/bg-pattern-blue-sm_1x.png" height="220px">
        <v-layout>
          <div style="margin-top:55px; margin-left:140px;">
            <v-avatar size="100px" class="text-xs-center">
              <img :src="user.avatar" alt="">
            </v-avatar>
            <p class="headline white--text mt-2" >{{user.fname}} {{user.lname}}</p>
          </div>
        </v-layout>
      </v-card-media>
    </v-card>
      <v-card class="elevation-0 grey lighten-3">
        <v-card-text>
          <div class="row">
              <div class="col-6">
                <h5 class="primary--text">{{purchaseCourseLength}}  </h5>
                <span class="grey--text"><b>คอร์สที่มี</b></span>
              </div>
              <!-- <div class="col-2">
                <hr style="width:0px; height:100%; border: 1px inset;">
              </div> -->
              <div class="col-6">
                <h5 class="primary--text">{{coursePrice}}</h5>
                <span class="grey--text"><b>จำนวนเงินที่จ่ายค่าคอร์ส</b></span>
              </div>
            </div>
        </v-card-text>
      </v-card>
      <v-card class="elevation-0">
        <v-card-text>
          <div class="row">
              <div class="col-5  text-xs-left">
                <v-icon primary>fa-id-card</v-icon>&nbsp;&nbsp;&nbsp;<span class="primary--text">{{user.user_id}}</span>
              </div>
              <div class="col-2">
                <!-- <hr style="background-color: silver; width:0px; height:100%; border: 1px inset; display:inline;"> -->
              </div>
              <div class="col-5  text-xs-left">
                <v-icon primary>account_circle</v-icon>&nbsp;&nbsp;&nbsp;<span class="primary--text">{{user.fname}} {{user.lname}}</span>
              </div>
          </div>
          <hr class="mt-4 mb-4">
          <div class="row">
              <div class="col-5 text-xs-left">
                <v-icon primary>email</v-icon>&nbsp;&nbsp;&nbsp;<span class="primary--text">{{user.email}}</span>
              </div>
              <div class="col-2">
                <!-- <hr style="background-color: silver; width:0px; height:100%; border: 1px inset; display:inline;"> -->
              </div>
              <div class="col-5  text-xs-left">
                <v-icon primary>phone</v-icon>&nbsp;&nbsp;&nbsp;<span class="primary--text">{{user.phone}} {{user.lname}}</span>
              </div>
          </div>
          <hr class="mt-4 mb-4">
          <div class="text-xs-left">
            <v-icon primary>location_on</v-icon>&nbsp;&nbsp;&nbsp;<span class="primary--text">126/1 ถนน วิภาวดีรังสิต แขวง สามเสนใน เขต ดินแดง กรุงเทพมหานคร 10400</span>
          </div>
        </v-card-text>
      </v-card>

      <!-- <v-list>
        <v-list-tile>
          <div class="row">
            <div class="col-6">
              <v-list-tile-content>
                <v-list-tile-title>ที่อยู่</v-list-tile-title>
              </v-list-tile-content>
            </div>
            <div class="col-">
              <v-list-tile-content>
                <v-list-tile-title>ที่อยู่</v-list-tile-title>
              </v-list-tile-content>
            </div>
          </div>

        </v-list-tile>
      </v-list> -->





        <bottomNav></bottomNav>

  </div>
</template>
<script>
export default {
    created() {
      this.$store.state.purchaseCourse.map(pc => this.coursePrice =+ pc.price)
    },
    data () {
      return {
        coursePrice: 0
      }
    },
    methods: {
      logout () {
        this.$store.commit('isLogin',false)
        this.$router.push('/')
      }
    },
    computed: {
      user () {
        return this.$store.state.profile
      },
      purchaseCourseLength () {
        return this.$store.state.purchaseCourse.length
      }
    }
}
</script>
