<template>
<v-app class="grey lighten-4"  style="margin: auto;" standalone>
<!-- <q-layout ref="layout" :reveal="true">
    <q-toolbar slot="header" v-if="$store.getters.title!='introduce'">
      <template v-if="parrentPage">
          <q-btn @click="$router.push('/home')" icon='arrow_back' flat>
          </q-btn>
      </template>
      <template v-if="isLogin">
          <q-btn
            flat
            @click="$refs.layout.toggleLeft()"
          >
            <q-icon name="menu" />
          </q-btn>
        </template>
      <q-toolbar-title>
        {{$store.getters.title}}
      </q-toolbar-title>
      <template v-if="!$store.getters.isLogin">
        <q-btn @click="$router.push('/login')" flat>
          ลงชื่อเข้าใช้
        </q-btn>
      </template>
    </q-toolbar>






<template v-if="$store.getters.isLogin=true">
    <div slot="left">
          <div class="text-center bg-grey-1"><br>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png" width="80px"><br>
                <p class="text-primary" style="display:inline;">{{user.name}}</p><br>
                <p class="text-black" style="display:inline;"><small>{{user.email}}</small></p><br><br>
                <hr>
          </div>

  <q-list-header>เมนูหลัก</q-list-header>
        <q-side-link item to="/home" exact>
          <q-item-side icon="school" />
          <q-item-main label="หน้าหลัก" />
        </q-side-link>
        <q-side-link item to="/bookmark">
          <q-item-side icon="bookmark" />
          <q-item-main label="คอร์สของฉัน" />
        </q-side-link>
        <q-side-link item to="/bookmark">
          <q-item-side icon="bookmark" />
          <q-item-main label="คลัง" />
        </q-side-link>
        <q-side-link item to="/message">
          <q-item-side icon="message" />
          <q-item-main label="กล่องข้อความ"  />
        </q-side-link>
        <q-side-link item to="/card">
          <q-item-side icon="payment" />
          <q-item-main label="บัตรเครดิต"  />
        </q-side-link>
        <hr>
            <q-list-header>อื่นๆ</q-list-header>
          <q-side-link item to="/setting">
            ช่วยเหลือ
          </q-side-link>
          <q-side-link item to="/setting">
            เกี่ยวกับเรา
          </q-side-link>
          <q-side-link item to="/setting">
            ตั้งค่า
          </q-side-link>
          <q-side-link item to="/signout">
              ออกจากระบบ
          </q-side-link>


    </div>
    <router-view />


  </template>






</q-layout> -->

<div>




  <router-view></router-view>








</div>

</v-app>

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
    QItemMain,
    QSideLink,
    QTab,
    QTabs,
    QRouteTab
  },
  created() {
    this.$store.state.isLogin == false ? this.alertLogin = false : this.alertLogin = true;

    console.log("router: " + this.$router);
  },
  data () {
    return {
      e1: 1,
      alertLogin: true
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
