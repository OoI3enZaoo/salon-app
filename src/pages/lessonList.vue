<template>
  <div>
    <!-- <v-card>
        <v-card-media :src="course.cover" height="300px">
          <v-layout column class="media">
            <v-card-title>
              <v-btn dark icon router to="/mycourse">
                <v-icon>chevron_left</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn dark icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-card-title>
            <div style="padding-top:60px;">
              <v-card-title class="white--text pl-5 pt-5">
                <div class="display-1 pl-3 pt-5">Ali Conners</div>
              </v-card-title>
            </div>
          </v-layout>
        </v-card-media>

    <v-list>
      <v-subheader>วันนี้</v-subheader>
        <template v-for="data in lesson">
          <v-list-tile avatar :key="data.lesson_id" @click="">
            <v-list-tile-avatar>
              <img :src="data.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{data.title}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-list-tile-action-text>{{data.tstamp | moment('from','now',true)}}</v-list-tile-action-text>
              <v-icon>star_border</v-icon>
            </v-list-tile-action>
          </v-list-tile>
            <v-divider inset></v-divider>
        </template>

    </v-list>
  </v-card> -->


  <toolbar :title="course.title" :back="true" link="/coursePurchase"></toolbar>
  <template v-for="data in lesson">
    <q-card>
      <router-link :to="'/lessonContent/' + data.lesson_id" tag="span">
        <q-item>
          <q-item-side :avatar="data.avatar" />
          <q-item-main>
            <q-item-tile label>{{data.fname}} {{data.lname}}</q-item-tile>
            <q-item-tile sublabel>{{data.tstamp | moment('from','now',true)}}</q-item-tile>
          </q-item-main>
        </q-item>
        <q-card-media>
          <img :src="data.cover">
        </q-card-media>
        <q-card-title>
          <b><p class="pull-left" v-text="data.title"></p></b>
          <div slot="right" class="row items-center">
            <v-icon class="pull-right">remove_red_eye</v-icon> &nbsp;<span>{{data.view}}</span>&nbsp;&nbsp;
              <v-icon class="pull-right">favorite</v-icon> &nbsp;<span>{{data.love}}</span>
          </div>
        </q-card-title>
      </router-link>
    </q-card>
  </template>
  </div>
</template>
<script>
import {
  QCard,
  QItemMain,
  QItem,
  QItemTile,
  QCardMedia,
  QCardTitle,
  QCardActions,
  QItemSide
} from 'quasar'
export default {
  beforeCreate() {
    if (this.$store.getters.lesson_from_course_id(this.$route.params.id) == '') {
      this.$store.dispatch('pullLesson', this.$route.params.id)
    }
  },
  components: {
    QCard,
    QItemMain,
    QItem,
    QItemTile,
    QCardMedia,
    QCardTitle,
    QCardActions,
    QItemSide
  },
  computed: {
    lesson () {
      return this.$store.getters.lesson_from_course_id(this.$route.params.id)
    },
    course () {
      return this.$store.getters.course_purchase_from_course_id(this.$route.params.id)[0]
    }
  }
}
</script>
