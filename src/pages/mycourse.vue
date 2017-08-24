<template>
  <div>
      <q-card class="white black--text">
        <div class="row">
            <div class="col-3">
                <q-card-media >
                    <img src="http://goo.gl/bkgA9d" alt="">
                </q-card-media>
            </div>
            <div class="col-9">
                <q-card-title>
                    <span>คอร์สบลาๆๆๆ</span>
                </q-card-title>
            </div>

        </div>
      </q-card>
      <q-card class="white black--text">
        <div class="row">
            <div class="col-3">
                <q-card-media >
                    <img src="http://goo.gl/bkgA9d" alt="">
                </q-card-media>
            </div>
            <div class="col-9">
                <q-card-title>
                    <span>คอร์สบลาๆๆๆ</span>
                </q-card-title>
            </div>
        </div>
      </q-card>
      <q-card class="white black--text">
        <div class="row">
            <div class="col-3">
                <q-card-media>
                    <img src="http://goo.gl/bkgA9d" alt="">
                </q-card-media>
            </div>
            <div class="col-9">
                <q-card-title>
                    <span>คอร์สบลาๆๆๆ</span>
                </q-card-title>
            </div>
        </div>
      </q-card>
  </div>
</template>
<script>
import {
  QCard,
  QCardTitle,
  QCardMedia
} from 'quasar'
export default {
  beforeCreate() {
    //do something before creating vue instance
    this.$store.commit('setTitle',"คอร์สของฉัน")
  },
  mounted() {
    //do something after creating vue instance
    console.log("course: " +this.$store.getters.user.key);
  },
  components: {
    QCard,
    QCardTitle,
    QCardMedia
  }
}
</script>
