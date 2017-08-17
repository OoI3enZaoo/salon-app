<template>
  <div>
      <div class="layout-padding">
          <h4 class="text-grey-8" style="text-align:center;">คุณยังไม่ได้บันทึกอะไรไว้เลยนะ</h4>
      </div>

  </div>
</template>
<script>
export default {
  created () {
    this.$store.commit('setTitle','โปรไฟล์')
  }
}
</script>
