<template>
  <div>
    <toolbar v-if="$store.state.isLogin == true" title="รายการโปรด" :back="false"></toolbar>
    <toolbar v-else title="รายการโปรด" :back="true" link="/"></toolbar>

      <div class="layout-padding">
          <h4 class="text-grey-8" style="text-align:center;">คุณยังไม่ได้บันทึกอะไรไว้เลยนะ</h4>
      </div>
      <bottomNav></bottomNav>

  </div>
</template>
<script>
export default {
  created () {
    this.$store.commit('setTitle','รายการโปรด')
  }
}
</script>
