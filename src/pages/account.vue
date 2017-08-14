<template>
  <div>
    <mToolbar title="โปรไฟล์"></mToolbar>
      <div class="layout-padding">
        <button class="primary" @click="logout">ออกจากระบบ</button>
      </div>

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
