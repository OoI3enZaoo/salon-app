<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <mToolbar></mToolbar>
    <router-view></router-view>

  </div>
</template>

<script>
import mToolbar from './components/toolbar.vue'
export default {
  components: {
    mToolbar
  }
}
</script>

<style></style>
