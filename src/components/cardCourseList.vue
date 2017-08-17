<template>
  <q-pull-to-refresh :handler="refresher" >
      <div class="layout-padding">

          <!-- <ul v-for="data in couseList">
            <li>{{data.name}}</li>
          </ul> -->

<!-- <q-btn @click="vibrate">vibrate</q-btn> -->
        <template v-for="data in couseList">
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
</q-pull-to-refresh>
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
export default {
  created () {
    document.addEventListener("deviceready", this.onDeviceReady, false);
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
    },
    refresher (done) {
      let newCourseList = []
      this.axios.get('https://salon-b177d.firebaseio.com/courses.json')
      .then(res => {
        let result = res.data
        for (let key in result) {
          newCourseList.push(result[key])
        }
        if (JSON.stringify(newCourseList) === JSON.stringify(this.couseList)) {
          console.log('old data')
          Toast.create({
            html: 'load data from store',
            icon: 'alarm_add',
            timeout: 2500
          })
          done()
        }
        else {
          console.log('new data from firebase')
          Toast.create({
            html: 'load data from firebase',
            icon: 'alarm_add',
            timeout: 2500
          })
          this.$store.commit('setCourseList', newCourseList)
          done()
          newCourseList = []
        }
        navigator.vibrate(3000);
      })
    },
    alertDismissed () {
      console.log('dismissed')
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
