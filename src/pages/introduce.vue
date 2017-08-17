<template>
  <div>
    <div class="layout-padding">
        <div class="text-center">
            <h5 class ="text-primary">Salon Academy</h5> <br>
        </div>
          <q-slider infinite autoplay arrows dots class="text-black" style="height:300px;">
              <div slot="slide" >
                <div class="card">
                  <div class="card-content text-center">
                    <p>อาจารย์</p>
                    <img src="https://web-school.in/wp-content/uploads/2014/01/teacher.png" height="90px">
                    <p>อาจารย์สมชาย น มงคล</p>
                    <p class ="text-grey-8">ผู้เชี่ยวชาญด้านเสริมสวยอันดับโลก</p>
                  </div>
                </div>
            </div>
            <div slot="slide" class="bg-secondary centered">
              Slide 2
            </div>
            <div slot="slide"class="bg-tertiary centered">
              Slide 3
            </div>
          </q-slider>
          <br>
            <div class="text-center">
              <h6>เรียนรู้กับผู้เชี่ยวชาญ</h6>
            </div>
    </div>
    <br><br><br>
    <div class="fixed-bottom ">
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
          label="สมัครสมาชิก"
          exact
          slot="title"
          />
     </q-tabs>
  </div>
  </div>
</template>
<script>
import {
  QToolbar,
  QTabs,
  QBtn,
  QRouteTab
} from 'quasar'
export default {
  created () {
    this.$store.commit('setTitle','introduce')
    const a = this.$store.getters.isLogin === true ? this.$router.push('/home') : ''
    console.log(a)
  },
  components: {
    QToolbar,
    QTabs,
    QBtn,
    QRouteTab
  }
}
</script>
