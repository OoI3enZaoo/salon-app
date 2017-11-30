<template>
<div>
  <toolbar v-if="$store.state.isLogin == true" title="ข้อความ" link="/home" :back="true"></toolbar>
  <toolbar v-else title="ข้อความ" :back="true" link="/"></toolbar>  
  <div class="layout-padding fixed-center">
    <q-scroll-area style="width: 100%;">
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


        <!-- <q-input style="position:fixed; bottom:0; width: 100%; height:10px;" v-model="text" placeholder="พิมพ์ข้อความ..." class="bg-white" color="white" :after="[{icon: 'arrow_forward', content: true, handler () {sendMessage(text)}}]" /> -->
        <div class="row" style="position:fixed; bottom:0; left:0; width:100%;">
          <div class="col-10">
            <v-text-field autofocus solo label="พิมข้อความ..." style="height:100%;"v-model="text" @keyup.enter="sendMessage(text)"></v-text-field>
          </div>
          <div class="col-2 blue">
            <v-card class="elevation-0" style="display:inline;"><a @click="sendMessage(text)" tag="span"><v-card-text class="white--text"><h6 style="display:inline;">ส่ง</h6></v-card-text></a></v-card>
          </div>
        </div>
    <!-- <q-card class ="bg-grey-1">
      <q-card-title>
        <q-btn slot="right" name="more_vert" round icon="send" color="primary" small @click="sendMessage(text)"/>
        <q-input  color="secondary" v-model="text" placeholder="กรอกข้อความ" />
    </q-card-title>
  </q-card> -->
  </div>
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
  created() {
    this.goToBottom()
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
      this.goToBottom()
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
    },
    goToBottom () {
      setTimeout(()=>{
        window.pageYOffset = 20000
        document.documentElement.scrollTop = 20000
      }, 20)
    }
  }
}
</script>
