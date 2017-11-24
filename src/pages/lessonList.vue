<template>
  <div>
  <v-card>
    <v-card-media :src="lesson.cover" height="300px">
      <v-layout column class="media">
        <v-card-title>
          <v-btn dark icon router to="/coursePurchase">
            <v-icon class="black--text">chevron_left</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn dark icon>
            <v-icon class="black--text">more_vert</v-icon>
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
      <v-subheader>วีดีโอของคอร์ส {{lesson.title}}</v-subheader>
          <template v-for="(data, i) in videoInLesson">
            <v-list-tile :key="i" @click="" @click.native="[currentVideo = data, dialog = true]">
              <v-list-tile-content>
                <v-list-tile-title v-html="data.title"></v-list-tile-title>
                <v-list-tile-sub-title>{{data.tstamp | moment('from','now',true)}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
        </template>
    </v-list>
  </v-card>

  <v-dialog v-model="dialog">
        <v-card>
          <v-toolbar dark color="primary">
         <v-btn icon @click.native="dialog = false" dark>
           <v-icon>close</v-icon>
         </v-btn>
         <v-toolbar-title>{{currentVideo.title}}</v-toolbar-title>
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
           <my-video ref="myvideo"  :videoname="currentVideo.video" :options="video.options" ></my-video>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>

export default {
  beforeCreate() {
    this.$store.dispatch('pullVideo', this.$route.params.id)
  },
  data () {
    return {
      dialog: false,
      currentVideo: {},
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
      this.$store.dispatch('addFavorite', this.currentVideo)
    },
    RemoveFavorite () {
      this.$store.dispatch('removeFavorite', this.currentVideo.lesson_id)
    },
    play () {
      // console.log(this.$refs.player);
      // let myVideo = 'http://172.104.189.169:4000/api/getfile/' + this.currentVideo.video
      // console.log(myVideo)
      // this.video.src = myVideo
    }
  },
  computed: {
    videoInLesson () {
      return this.$store.getters.video_from_lesson_id(this.$route.params.id)
    },
    lesson () {
      return this.$store.getters.lesson_from_lesson_id(this.$route.params.id)[0]
    },
    favorite () {
      return this.$store.getters.favorite_from_video_id(this.currentVideo.video_id)[0]
    }
  }
}
</script>
