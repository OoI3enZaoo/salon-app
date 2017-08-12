<template>
<div>

  <div class="layout-padding">


    <template v-for="data in couseList">
    <div class="card">
      <div class="card-title bg-primary text-white">
        {{data.name}}
      </div>
      <q-parallax :src="data.cover" :height="150">
          <div slot="loading">Loading...</div>
      </q-parallax>
      <div class="card-content card-force-top-padding">
        <p v-html="data.snippet"></p>
      </div>
    </div>
  </template>


  </div>

</div>
</template>

<script>
export default {
  computed: {
    couseList () {
      return this.$store.getters.courseList
    }
  }
}
</script>
