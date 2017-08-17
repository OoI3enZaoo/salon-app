<template>
  <div>
    <h2>account</h2>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.commit('setTitle','โปรไฟล์')
  },
  data () {
    return {
      text: ''
    }
  }
}
</script>
