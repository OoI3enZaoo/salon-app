<template>
  <div>
    <mToolbar title="โพรไฟล์"></mToolbar>
      <div class="layout-padding">
        <button class="primary" @click="logout">ออกจากระบบ</button>
      </div>
      <tabs></tabs>
  </div>
</template>
<script>
export default {
  methods: {
    logout () {
      this.$router.push('/')
    }
  }
}
</script>
