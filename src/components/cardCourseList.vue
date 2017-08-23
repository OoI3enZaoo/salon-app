<template>
  <!-- <q-pull-to-refresh :handler="refresher" > -->
      <div class="layout-padding">

          <!-- <ul v-for="data in couseList">
            <li>{{data.name}}</li>
          </ul> -->

<!-- <q-btn @click="vibrate">vibrate</q-btn> -->
        <template v-for="data in courseRef">
          <router-link :to="'/courseContent/'+data.key">
              <q-card>
                <q-card-media>
                  <img :src="data.cover" >
                </q-card-media>
                <q-card-title>
                  <b>{{data.name}}</b>
                  <div slot="right" class="row items-center">
                      THB{{data.price}}
                  </div>
                </q-card-title>
                <q-card-main>

                  <p class="text-faded">{{data.snippet}}</p>
                </q-card-main>
                <q-card-separator />
              </q-card>


            </router-link>
            </template>

      </div>
<!-- </q-pull-to-refresh> -->
</template>





<script>

import { QLayout, Toast, QPullToRefresh,
  QCard,
  QCardTitle,
  QCardMain,
  QIcon,
  QCardMedia,
  QCardSeparator,
  QBtn,
  } from 'quasar'

  import {db} from '../../firebase'
  let courseRef = db.ref('courses')
export default {
  firebase: {
    courseRef
  },  
  data () {
    return {
      courseList: []
    }
  },
  computed: {
    couseList () {
      return this.$store.getters.courseList
    }
  },
  methods: {
    onDeviceReady () {
      console.log(navigator.vibrate);
    },
    vibrate () {
      navigator.vibrate(3000)
    }
  },
  components: {
    QLayout,
    QPullToRefresh,
    QCard,
    QCardTitle,
    QCardMain,
    QIcon,
    QCardMedia,
    QCardSeparator,
    QBtn
  }
}
</script>
