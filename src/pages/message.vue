<template>
<div>
  <toolbar v-if="$store.state.isLogin == true" title="ข้อความ" :back="false"></toolbar>
  <toolbar v-else title="ข้อความ" :back="true" link="/"></toolbar>
  <div class="layout-padding fixed-center">
    <q-scroll-area style="width: 100%; ">
      <template v-for="data in $store.state.message">
          <template v-if="data.type=='user'">
              <q-chat-message
                :name="data.ufname + ' ' + data.ulname"
                :avatar="data.uavatar"
                :text="[data.text]"
                :stamp="data.tstamp"
                bg-color="grey"
                sent
              />
        </template>
      <template v-else>
            <q-chat-message
              :name="data.afname + ' ' + data.alname"
              :avatar="data.aavatar"
              :text="[data.text]"
              :stamp="data.tstamp"
              bg-color="green"
            />
      </template>
      </template>
      <br><br>
    </q-scroll-area>

    <div class="fixed-bottom bg-grey-2" style="margin-bottom:80px">
      <q-card>

        <q-input v-model="text" placeholder="พิมพ์ข้อความ..." class="bg-white" color="white" :after="[{icon: 'arrow_forward', content: true, handler () {sendMessage(text)}}]" />

      </q-card>
    </div>
    <!-- <q-card class ="bg-grey-1">
      <q-card-title>
        <q-btn slot="right" name="more_vert" round icon="send" color="primary" small @click="sendMessage(text)"/>
        <q-input  color="secondary" v-model="text" placeholder="กรอกข้อความ" />
    </q-card-title>
  </q-card> -->

  </div>
  <bottomNav></bottomNav>
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
  data() {
    return {
      text: '',
      messageMe: []
    }
  },
  mounted() {
    this.$options.sockets.fromAdmin = (data) => {
      let mes = {
        admin_id: data.admin_id,
        user_id: data.user_id,
        text: data.text,
        aavatar: data.avatar,
        afname: data.fname,
        alname: data.lname,
        tstamp: data.tstamp,
        type: 'admin'
      }
      this.$store.commit('addMessage', [mes])
    }
  },
  computed: {
    user() {
      return this.$store.state.profile
    }
  },
  methods: {
    sendMessage(val) {
      if (val !== '') {
        let message = {
          user_id: this.user.user_id,
          text: val,
          tstamp: Vue.moment().format('YYYY-MM-DD HH:mm:ss'),
          avatar: this.user.avatar,
          fname: this.user.fname,
          lname: this.user.lname,
          type: 'user'
        }
        let mes = {
          user_id: this.user.user_id,
          text: val,
          tstamp: Vue.moment().format('YYYY-MM-DD HH:mm:ss'),
          uavatar: this.user.avatar,
          ufname: this.user.fname,
          ulname: this.user.lname,
          type: 'user'
        }
        this.$store.commit('addMessage', [mes])
        this.$socket.emit('private_message', message)
        let {user_id, text, tstamp, type} = message
        this.$store.dispatch('sendMessage', {user_id, text, tstamp, type})
        this.text = ''
      }
    }
  }
}
</script>
