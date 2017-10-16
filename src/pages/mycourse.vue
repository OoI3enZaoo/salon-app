<template>
  <div>
    <toolbar v-if="$store.state.isLogin == true" title="คอร์สของฉัน" :back="false"></toolbar>
    <toolbar v-else title="คอร์สของฉัน" :back="true" link="/"></toolbar>
      <template v-for="data2 in course">
          <template v-for="data in $store.getters.course_from_course_id(data2.course_id)">
            <q-card inline>
               <router-link :to="'/lessonList/' + data.course_id">
              <q-card-media>
                <img :src="data.cover">
              </q-card-media>
              <q-card-title>
                {{data.title}}
              </q-card-title>
                </router-link>
            </q-card>
          </template>
      </template>
      <bottomNav></bottomNav>
  </div>
</template>
<script>
import {
  QCard,
  QCardTitle,
  QCardMedia
} from 'quasar'
export default {
  computed: {
    course () {
      return this.$store.state.purchaseCourse
    }
  },
  components: {
    QCard,
    QCardTitle,
    QCardMedia
  }
}
</script>
