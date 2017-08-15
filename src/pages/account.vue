<template>
  <div>
    <mToolbar title="โปรไฟล์"></mToolbar>
      <div class="layout-padding">
        <div class="floating-label">
          <input type="text" v-model="text">
          <label>text</label>
        </div>

        <button class="primary" @click="emit(text)">emit</button>
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
      text: '',
      message: []
    }
  },
  methods: {
    emit (val) {
      this.$socket.emit('chat_message', val)
    }
  },
  mounted () {
    this.$options.sockets.chat_message = (data) => {
      console.log(data)
      this.message.push(data)
    }
  }
}
</script>
