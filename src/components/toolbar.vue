<template>
  <div>
<q-layout ref="layout">
    <q-toolbar slot="header" >
      <template v-if="icon!=null">
          <button @click="linkTo(goto)">
              <q-icon :name="icon"/>
          </button>
      </template>
      <template v-if="$store.getters.isLogin">
          <q-btn
            flat
            @click="$refs.layout.toggleLeft()"
          >
            <q-icon name="menu" />
          </q-btn>
        </template>
      <q-toolbar-title>
        {{title}}
      </q-toolbar-title>
      <template v-if="!$store.getters.isLogin">
        <q-btn @click="$router.push('/login')" flat>
          ลงชื่อเข้าใช้
        </q-btn>
      </template>
    </q-toolbar>

<template v-if="$store.getters.isLogin=true">
    <div slot="left">
      <!--
        Use <q-side-link> component
        instead of <q-item> for
        internal vue-router navigation
      -->

      <q-list link inset-delimiter>
        <q-list-header>

          <div class="text-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png" width="80px"><br>
                <p class="text-primary" style="display:inline;">{{user.name}}</p><br>
                <p class="text-black" style="display:inline;"><small>{{user.email}}</small></p>
          </div>
        </q-list-header>
        <q-item to="/home" exact>
          <q-item-side icon="school" />
          <q-item-main label="หน้าหลัก" />
        </q-item>
        <q-item to="/bookmark">
          <q-item-side icon="bookmark" />
          <q-item-main label="คลัง" />
        </q-item>
        <q-item to="/message">
          <q-item-side icon="message" />
          <q-item-main label="กล่องข้อความ"  />
        </q-item>
        <q-item to="/account">
          <q-item-side icon="account_box" />
          <q-item-main label="โปรไฟล์"  />
        </q-item>
        <hr>
            <q-list-header>อื่นๆ</q-list-header>
          <q-item  to="/setting">
            ช่วยเหลือ
          </q-item>
          <q-item  to="/setting">
            เกี่ยวกับเรา
          </q-item>
          <q-item  to="/setting">
            ตั้งค่า
          </q-item>
          <div @click.capture="signout">
              <q-item  >
                ออกจากระบบ
              </q-item>
          </div>

      </q-list>

    </div>
    <router-view />
  </template>

<hr width="1" size="500">

</q-layout>
  </div>
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
QItemMain
} from 'quasar'

import { mapGetters } from 'vuex'
export default {
  props: ['title', 'icon', 'goto'],
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
    QItemMain
  },
  methods: {
    linkTo (url) {
      console.log('linkto: ' + url)
      this.$router.push({path: url})
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
    console.log('toolbaruser: ' + JSON.stringify(this.user))
    console.log('isLogin: ' + this.$store.getters.isLogin)
    console.log('toolbar: ' + this.$store.getters.title)
  }
}
</script>
