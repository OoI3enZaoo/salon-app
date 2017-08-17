<template>
  <div>
    <q-card>
      <q-card-media>
        <q-video src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0" style="height:250px;" />
      </q-card-media>
      <q-card-title>
        <div class="text-grey-9" >{{data.name}}</div>
          <span slot="subtitle">{{data.author}}</span>
          <span slot="right" class="row items-center">
              <q-btn class="bg-primary text-white">ซื้อตอนนี้</q-btn>
          </span>
      </q-card-title>
    </q-card>
    <q-card>
      <q-card-title>
        <p>เนื้อหาของคอร์ส</p>
      </q-card-title>
      <q-card-main>
            <p v-html="data.description"></p>
      </q-card-main>
    </q-card>



  </div>
</template>
<script>
import {
  QCard,
  QCardTitle,
  QCardMain,
  QCardMedia,
  QVideo,
  QBtn
} from 'quasar'
export default {
  created () {
    this.$store.commit('findCourse', this.$route.params.id)
    this.data = this.$store.getters.course
    console.log('data: ' + JSON.stringify(this.data.name))
    this.$store.commit('setTitle', this.data.name)
  },
  components: {
    QCard,
    QCardTitle,
    QCardMain,
    QCardMedia,
    QVideo,
    QBtn
  },
  data () {
    return {
      data: {}
    }
  }
}
</script>
