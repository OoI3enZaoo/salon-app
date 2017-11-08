<template>
  <div style="background-color:#0288D1;">

          <q-carousel dots class="text-black" style="height:100vh;" ref="carou">
              <div slot="slide"class="centered">
                <img :src="intro1" height="200vh">
                  <div class="mt-5 white--text">
                    <h6>เรียนรู้ได้ตลอดเวลา</h6>
                    <small>รวบรวมความรู้เกี่ยวกับช่างเสริมสวยไว้ที่นี่หมดแล้ว</small>
                  </div>
                  <!-- <a href="www.google.co.th"><v-btn flat color="white" style="position:fixed; bottom:0; left:0; z-index: 1;" @click.native="test">ข้าม</v-btn></a>
                  <v-btn flat color="white" style="position:fixed; bottom:0; right:0;">ถัดไป</v-btn> -->
              </div>
            <div slot="slide" class="centered">
              <img :src="intro2" height="200vh">
                <div class="mt-5 white--text">
                  <h6>เติบโต</h6>
                  <small>เพราะการใฝ่รู้เป็นสิ่งจำเป็นที่จะทำให้เราก้าวรุดหน้าจากผู้อื่น</small>
                </div>
            </div>
            <div slot="slide"class="centered">
              <img :src="intro3" height="200vh">
                <div class="mt-5 white--text">
                  <h6>กับอาจารย์สมชาย</h6>
                  <small>ผู้เชี่ยวชาญด้านเสริมสวย ประสบการณ์กว่า 30 ปี</small><br><br>
                  <router-link tag="span" to="/home"><v-btn round class="primary--text">ฉันพร้อมแล้ว</v-btn></router-link>
                </div>
            </div>
          </q-carousel>
          <!-- <br>
            <div class="text-center">
              <h6>เรียนรู้กับผู้เชี่ยวชาญ</h6>
            </div> -->
    <!-- <div class="fixed-bottom">
    <q-tabs class="shadow-2"
    position= "bottom">
      <q-route-tab
          icon="visibility"
          to="/home"
          label="เยี่ยมชม"
          exact
          slot="title"
          />
          <q-route-tab
          icon="supervisor_account"
          to="/login"
          label="เข้าสู่ระบบ"
          exact
          slot="title"
          />
     </q-tabs>
  </div> -->
  </div>
</template>
<script>
import {
  QToolbar,
  QTabs,
  QBtn,
  QRouteTab,
  QCarousel
} from 'quasar'
export default {
  created () {
    const a = this.$store.state.isLogin == true ? this.$router.push('/home') : ''
  },
  data () {
    return {
      intro1: require('../statics/intro1.png'),
      intro2: require('../statics/intro2.png'),
      intro3: require('../statics/intro3.png')
    }
  },
  methods: {
    test() {
      console.log(this.$refs.carou.slide)
    }
  },
  components: {
    QToolbar,
    QTabs,
    QBtn,
    QRouteTab,
    QCarousel
  }
}
</script>
