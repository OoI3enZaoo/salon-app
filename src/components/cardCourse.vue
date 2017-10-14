<template>
    <q-card inline>
       <router-link :to="'/courseContent/' + courseId">
      <q-card-media>
        <img :src="cover">
      </q-card-media>
      <q-card-title>
        {{title}}
        <div slot="right" class="row items-center">
          {{price}} บาท
        </div>
      </q-card-title>
      <q-card-main>
        <p class="text-faded" v-html="description_short"></p>
      </q-card-main>
        </router-link>
    </q-card>
    </template>
<script>
import {
  QCardTitle,
  QCard,
  QCardActions,
  QCardMedia,
  QCardMain,
  QIcon
} from 'quasar'
export default {
  components: {
    QCardTitle,
    QCard,
    QCardActions,
    QCardMedia,
    QCardMain,
    QIcon
  },
  props: ['courseId','cover','title','price','snippet','fname','lname','description'],
  computed: {
    description_short () {
      return this.description.substring(0, 120) + '...'
    }
  }
}
</script>
