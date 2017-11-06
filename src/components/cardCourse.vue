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
        <d-player :video="{url : 'http://172.104.189.169:4000/api/getfile/' + data.video, pic: data.cover}"
                      :contextmenu="contextmenu"
                      screenshot="true"
                      ref="player">
            </d-player>

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
            <router-link :to="'/courseContent/' + data.course_id" tag="span" style="cursor:pointer;">
              <v-btn color="primary" style="position: absolute; bottom:3%; right:2%;">ดูรายละเอียด</v-btn>
            </router-link>
        </v-card-actions>
      </v-card>
      <br>
    </div>
</template>
<script>

export default {
  props: ['data'],
  computed: {
    description_short () {
      return this.description.substring(0, 120) + '...'
    }
  },
  data () {
    return {
      contextmenu: [
          {
              text: 'GitHub',
              link: 'https://github.com/MoePlayer/vue-dplayer'
          }
      ]
    }
  },
  methods: {
    play () {
      console.log('play callback')
    }
  }
}
</script>
