<template>
  <div>
    <mToolbar title="โปรไฟล์"></mToolbar>
      <div class="layout-padding">
        <div class="text-center">
          <h3>Room: {{keyUser}}</h3>
        </div>
        <div class="floating-label">
          <input type="text" v-model="text">
          <label>text</label>
        </div>      

      </div>
      <ul v-for="data in message">
        <li>{{data}}</li>
      </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: ''
    }
  }
}
</script>
