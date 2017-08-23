<template>
 <div class="layout-padding fixed-center">
<q-scroll-area style="width: 100%; " >
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
      <br><br>
    </q-scroll-area>

    <div class="fixed-bottom bg-grey-2" style="margin-bottom:80px" >
      <q-card>

        <q-input v-model="text" placeholder="พิมพ์ข้อความ..."  class="bg-white" color="white" :after="[{icon: 'arrow_forward', content: true, handler () {sendMessage(text)}}]" />

    </q-card>
    </div>
<!-- <q-card class ="bg-grey-1">
      <q-card-title>
        <q-btn slot="right" name="more_vert" round icon="send" color="primary" small @click="sendMessage(text)"/>
        <q-input  color="secondary" v-model="text" placeholder="กรอกข้อความ" />
    </q-card-title>
  </q-card> -->
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
  QInput,
  QCard,
  QCardMain,
  QCardTitle,
  QCardMedia,
  QToolbar
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
    QInput,
    QCard,
    QCardMain,
    QCardTitle,
    QCardMedia,
    QToolbar
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
