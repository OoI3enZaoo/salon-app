<template>
  <div>
    <mToolbar title="กล่องข้อความ"></mToolbar>

    <div class="layout-padding">

 <div class="layout-padding" style="max-width: 500px;">

      <template v-for="data in messageMe">
            <template v-if="data.type=='user'">
                  <div class="chat-you">
                    <div class="chat-user">
                      <img :src="data.image">
                    </div>
                    <div class="chat-date">
                      {{data.tstamp}}
                    </div>
                    <div class="chat-message">
                      <p>
                        {{data.message}}
                      </p>
                    </div>
                  </div>
            </template>
            <template v-else>
                  <div class="chat-other">
                    <div class="chat-user">
                      <img :src="'https://upload.wikimedia.org/wikipedia/commons/9/96/User_icon-cp.png'">
                    </div>
                    <div class="chat-date">
                      7 minutes ago
                    </div>
                    <div class="chat-message">
                      <p>
                        {{data.message}}
                      </p>
                    </div>
                  </div>
            </template>
      </template>


    </div>
    <div class="floating-label" ref="chat">
  <input type = "text" required autofocus v-model="text">
  <label>พิมพ์ข้อความที่นี่..</label>   <button class="primary" @click="sendMessage(text)">emit</button>
</div>

        </div>
        <br><br><br>
  </div>
</template>
<script>
export default {
  created () {
    this.$socket.emit('subscribe', this.keyUser)
    this.$refs.chat.focus()
  },
  data () {
    return {
      text: '',
      messageMe: []
    }
  },
  computed: {
    keyUser () {
      return this.$store.getters.user.key
    },
    imageUser () {
      return this.$store.getters.user.image
    },
    nameUser () {
      return this.$store.getters.user.name
    }
  },
  methods: {
    sendMessage (val) {
      this.$socket.emit('private_message', {room: this.keyUser, message: val, tstamp: '2017-08-16 12:39', image: this.imageUser, name: this.nameUser, type: 'user'})
    }
  },
  mounted () {
    this.$options.sockets.conversation_private = (data) => {
      console.log(data)
      this.messageMe.push(data)
    }
    this.$options.sockets.fromAdmin = (data) => {
      console.log('admin: ' + data)
      this.messageMe.push(data)
    }
  }
}
</script>
