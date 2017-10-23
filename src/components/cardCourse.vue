<template>
    <!-- <q-card inline>
       <router-link :to="'/courseContent/' + data.course_id">
      <q-card-media>
        <img :src="data.cover">
      </q-card-media>
      <q-card-title>
        {{data.title}}
        <div slot="right" class="row items-center">
          {{data.price}} บาท
        </div>
      </q-card-title>
      <q-card-main>
        <p class="text-faded" v-html="data.description_short"></p>
      </q-card-main>
        </router-link>
    </q-card> -->
    <div>
      <v-card class="elevation-1">
      <router-link :to="'/courseContent/' + data.course_id" tag="span">
        <q-video :src="data.youtube" style="height:300px;" />
        <v-card-title>
          <div class="text-xs-left">
            <span class="headline" style="display:inline;"v-text="data.title"></span>
            <span>{{data.ts | moment('from','now', true)}} ที่ผ่านมา</span>
            <br>
            <span>โดย {{data.fname}} {{data.lname}}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-icon>remove_red_eye</v-icon> <span>{{data.view}}</span> &nbsp;&nbsp;
          <v-icon>shopping_cart</v-icon> <span>{{data.purchase}}</span> &nbsp;&nbsp;
          <v-icon>fa-money</v-icon> <span>{{data.price}}</span>
        </v-card-actions>
        </router-link>
      </v-card>
      <br>
    </div>
</template>
<script>
import {
  QCardTitle,
  QCard,
  QCardActions,
  QCardMedia,
  QCardMain,
  QIcon,
  QVideo
} from 'quasar'
export default {
  components: {
    QCardTitle,
    QCard,
    QCardActions,
    QCardMedia,
    QCardMain,
    QIcon,
    QVideo
  },
  props: ['data'],
  computed: {
    description_short () {
      return this.description.substring(0, 120) + '...'
    }
  }
}
</script>
