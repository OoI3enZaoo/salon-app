<template>

<v-app class="grey lighten-4"  style="margin: auto;" standalone>
  <div id="q-app">
    <router-view></router-view>
  </div>
</v-app>
<!--
  <div id="q-app">
    <router-view />
  </div> -->
</template>
<script>

import {
QLayout,
QToolbar,
openURL,
QToolbarTitle,
QIcon,
QList,
QListHeader,
QBtn,
QItem,
QItemSide,
QItemMain,
QSideLink,
QTab,
QTabs,
QRouteTab,
} from 'quasar'

import { mapGetters } from 'vuex'
import Vue from 'vue'
export default {
  props: ['title', 'icon', 'goto'],
  beforeCreate () {
    this.$store.dispatch('pullCourse')
    this.$store.dispatch('loadFavorite', this.$store.state.profile.user_id)
    this.$store.dispatch('loadLessonFromUserId', this.$store.state.profile.user_id)
    this.$socket.emit('subscribe', this.$store.state.profile.user_id)
    this.$store.dispatch('getLastChat', this.$store.state.profile.user_id)
    this.$store.dispatch('LoadCreditCard', this.$store.state.profile.user_id)
  },
  components: {
    QLayout,
    QToolbar,
    openURL,
    QToolbarTitle,
    QIcon,
    QItem,
    QList,
    QListHeader,
    QBtn,
    QItemSide,
    QItemMain,
    QSideLink,
    QTab,
    QTabs,
    QRouteTab
  },
  created() {
    this.$store.state.isLogin == false ? this.alertLogin = false : this.alertLogin = true;
    console.log("router: " + this.$router);
      console.log(Vue.cordova)
      // window.alert('status: ' + Vue.cordova.plugins.backgroundMode.isActive())
    // console.log(Vue.cordova.plugins.backgroundMode.isActive())
  },
  mounted() {
    this.$options.sockets.fromAdmin = (data) => {
      console.log('admin111: ' + data)
    }
  },
  data () {
    return {
      e1: 1,
      alertLogin: true,
      cordova: Vue.cordova
    }
  },
  methods: {
    linkTo (el,link) {
      console.log('linkto: el: ' + el + " link: " + link);
       this.e1 = el
       this.$router.push(link)
    },
    signout () {
      this.$store.dispatch('signout')
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  mounted () {
    console.log('isLogin: ' + this.$store.state.isLogin)
  }
}
</script>
<style>
html {
  height: 100%;
}
body {
  height: 100%;
}
#app {
  color: #2c3e50;
  margin: 40px auto;
  max-width: 640px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}
.logo {
  padding-bottom: 30px;
}
.logo span {
  position: relative;
  top: -30px;
  font-size: 36px;
  margin: 0 20px;
}
.logo img {
  width: 90px;
  height: 90px;
}
div.dump {
  background: #eee;
  text-align: left;
  border: solid 1px #ccc;
  padding: 20px;
  max-width: 600px;
  box-sizing: border-box;
  font-family: monospace;
  white-space: pre;
}
div.alert {
  color: #c00;
  font-weight: bold;
  font-size: .9em;
  padding-bottom: 30px;
  line-height: 1.6;
}
div.alert a {
  color: inherit;
}
div.indicators {
  width: 340px;
  margin: 0 auto 40px;
  text-align: left;
  font-family: Courier, Courier New, sans-serif;
}
div.indicators div {
  padding-bottom: 15px;
  opacity: .6;
}
div.indicators div.ok {
  opacity: 1;
  cursor: pointer;
}
div.indicators div.ok span {
  background: #0c0;
}
div.indicators div span {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: #c00;
  border-radius: 20px;
  position: relative;
  top: 3px;
  margin-right: 15px;
}
div.indicators p {
  font-size: .8em;
  font-weight: bold;
  padding-bottom: 20px;
}
</style>
