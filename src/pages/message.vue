<template>
  <div>

    <div class="layout-padding">

 <div class="layout-padding" style="max-width: 500px;">
<q-scroll-area style="width: 100%; height: 500px;">
      <template v-for="data in messageMe">
          <template v-if="data.type=='user'">
              <q-chat-message
                :name="data.name"
                :avatar="data.image"
                :text="[data.message]"
                :stamp="data.tstamp"
                bg-color="grey-"
                sent
              />
        </template>
        <template v-else>
            <q-chat-message
              :name="data.name"
              :avatar="data.image"
              :text="[data.message]"
              :stamp="data.tstamp"
              bg-color="green"
            />
      </template>

      </template>
</q-scroll-area>
    </div>


<q-field
  count
  helper="Some helper here"
  :label-width="3"
>
  <q-input float-label="พิมพ์ข้อความของคุณที่นี่" v-model="text" />
</q-field>
<q-btn round icon="send" color="primary" small @click="sendMessage(text)">
</q-btn>

        </div>
        <br><br><br>
  </div>
</template>
<script>
const moment = require('moment')
import Vue from 'vue'
import {
  QScrollArea,
  QChatMessage,
  QBtn,
  QIcon,
  QField,
  QInput
} from 'quasar'
Vue.use(require('vue-moment'), {
  moment
})
export default {
  created () {
    this.$socket.emit('subscribe', this.keyUser)
    this.$store.commit('setTitle','แชท')
  },
  components: {
    QScrollArea,
    QChatMessage,
    QBtn,
    QIcon,
    QField,
    QInput
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
    },
    timeUser () {
      return Vue.moment().format('DD/MM/YYYY HH:mm:ss')
    }
  },
  methods: {
    sendMessage (val) {
      if(val !== ''){
        this.$socket.emit('private_message', {room: this.keyUser, message: val, tstamp: Vue.moment().format('DD/MM/YYYY HH:mm:ss'), image: this.imageUser, name: this.nameUser, type: 'user'})
        this.text = ''
      }
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
