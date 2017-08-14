<template>
  <div>
    <div class="layout-padding">
        <div class="text-center">
            <h2 class ="text-primary">Salon Academy</h2> <br>
        </div>
          <q-slider infinite autoplay arrows dots class="text-black" style="height:500px;">
              <div slot="slide" v-model="refa">
                <div class="card">
                  <div class="card-content text-center">
                    <p>อาจารย์</p>
                    <img src="https://web-school.in/wp-content/uploads/2014/01/teacher.png">
                    <p>อาจารย์สมชาย น มงคล</p>
                    <p class ="text-grey-8">ผู้เชี่ยวชาญด้านเสริมสวยอันดับโลก</p>
                  </div>
                </div>
            </div>
            <div slot="slide"  v-model="refa"class="bg-secondary centered">
              Slide 2
            </div>
            <div slot="slide" v-model="refa" class="bg-tertiary centered">
              Slide 3
            </div>
          </q-slider>
            <div class="text-center">
              <h4>เรียนรู้กับผู้เชี่ยวชาญ</h4>
            </div>
    </div>
    <br><br><br>
        <tabs :introduce= "true"></tabs>

  </div>
</template>
<script>
export default {
}
</script>
