<template>
  <div>



  <!-- <toolbar :title="course.title" :back="true" link="/coursePurchase"></toolbar> -->

  <v-card>
    <v-card-media :src="course.cover" height="300px">
      <v-layout column class="media">
        <v-card-title>
          <v-btn dark icon router to="/coursePurchase">
            <v-icon>chevron_left</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn dark icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-card-title>
        <div style="padding-top:60px;">
          <v-card-title class="white--text pl-5 pt-5">
            <div class="display-1 pl-3 pt-5">{{lesson.title}}</div>
          </v-card-title>
        </div>
      </v-layout>
    </v-card-media>
    <v-list subheader two-line>
      <v-subheader>วีดีโอของคอร์ส {{course.title}}</v-subheader>
        <v-list-tile v-for="(data, i) in lesson" :key="i"@click="" @click.native="[currentLesson = data, dialog = true]">
          <v-list-tile-avatar>
            <img :src="data.avatar">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="data.title"></v-list-tile-title>
            <v-list-tile-sub-title>{{data.tstamp | moment('from','now',true)}}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <!-- <v-icon>remove_red_eye</v-icon> &nbsp;<span>{{data.view}}</span>&nbsp;&nbsp; -->
              <!-- <v-icon class="pull-right">favorite</v-icon> &nbsp;<span>{{data.love}}</span> -->
          </v-list-tile-action>
        </v-list-tile>
    </v-list>
  </v-card>

  <v-dialog v-model="dialog" fullscreen>
        <v-card>
          <v-toolbar dark color="primary">
         <v-btn icon @click.native="dialog = false" dark>
           <v-icon>close</v-icon>
         </v-btn>
         <v-toolbar-title>{{currentLesson.title}}</v-toolbar-title>
         <v-spacer></v-spacer>
         <v-toolbar-items>
           <template v-if="favorite">
             <v-btn dark icon @click.native="RemoveFavorite">
               <v-icon>favorite</v-icon>
             </v-btn>
           </template>
           <template v-else>
             <v-btn dark icon @click.native="addFavorite">
               <v-icon>favorite_border</v-icon>
             </v-btn>
           </template>
         </v-toolbar-items>
       </v-toolbar>
           <my-video ref="myvideo"  :videoname="currentLesson.video" :options="video.options" ></my-video>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>

export default {
  beforeCreate() {
    if (this.$store.getters.lesson_from_course_id(this.$route.params.id).length == 0) {
      this.$store.dispatch('pullLesson', this.$route.params.id)
    }
  },

  data () {
    return {
      dialog: false,
      currentLesson: {},
      video: {
        options: {
            autoplay: false,
            volume: 0.6,
            poster: 'http://gw2101.gtm.guildwars2.com/global/includes/images/video-poster.jpg'
        }
      }
    }
  },
  methods: {
    addFavorite () {
      this.$store.dispatch('addFavorite', this.currentLesson)
    },
    RemoveFavorite () {
      this.$store.dispatch('removeFavorite', this.currentLesson.lesson_id)
    },
    play () {
      // console.log(this.$refs.player);
      // let myVideo = 'http://172.104.189.169:4000/api/getfile/' + this.currentLesson.video
      // console.log(myVideo)
      // this.video.src = myVideo
    }
  },
  computed: {
    lesson () {
      return this.$store.getters.lesson_from_course_id(this.$route.params.id)
    },
    course () {
      return this.$store.getters.course_purchase_from_course_id(this.$route.params.id)[0]
    },
    favorite () {
      return this.$store.getters.favorite_from_lesson_id(this.currentLesson.lesson_id)[0]
    }
  }
}
</script>
