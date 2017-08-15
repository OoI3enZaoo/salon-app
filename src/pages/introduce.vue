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
        <tabs :introduce= "true"></tabs>

  </div>
</template>
<script>
export default {
  created () {
    const a = this.$store.getters.isLogin === true ? this.$router.push('/home') : ''
    console.log(a)
  }
}
</script>
