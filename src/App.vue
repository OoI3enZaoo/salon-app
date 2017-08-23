<template>

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

  <v-toolbar dark class="primary" >
    <v-btn class="white--text" icon v-if="!parrentPage" @click.native="$router.push('/home')">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-toolbar-title class="white--text">{{$store.getters.title}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon class="white--text" @click.native="$router.push('/profile')">
      <v-icon>person_outline</v-icon>
    </v-btn>
    <v-btn icon class="white--text">
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>

<v-alert
    warning
    hide-icon
    dismissible
    v-model="alertLogin"
    v-if="isAlertVisible"
>

    คุณยังไม่ได้ลงทะเบียนเลยนะ <v-btn primary @click.native="$router.push('/login')">ลงทะเบียน</v-btn>


</v-alert>

  <router-view></router-view>


 <v-bottom-nav value="true" class="white elevation-11 "v-if="parrentPage" >
   <v-btn flat light class="primary--text" @click.native="linkTo(1,'/home')" :value="e1 === 1">
     <span>บ้าน</span>
     <v-icon>home</v-icon>
   </v-btn>
   <v-btn flat light class="primary--text" @click.native="linkTo(2,'/mycourse')" :value="e1 === 2">
     <span>คอร์สของฉัน</span>
     <v-icon>bookmark</v-icon>
   </v-btn>
   <v-btn flat light class="primary--text" @click.native="linkTo(3,'/bookmark')" :value="e1 === 3">
     <span>รายการโปรด</span>
     <v-icon>favorite</v-icon>
   </v-btn>
   <v-btn flat light class="primary--text" @click.native="linkTo(4,'/message')" :value="e1 === 4">
     <span>ข้อความ</span>
     <v-icon>message</v-icon>
   </v-btn>
 </v-bottom-nav>





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
    //do something after creating vue instance
    this.$store.getters.isLogin == false ? this.alertLogin = false : this.alertLogin = true;

    console.log("router: " + this.$router);
  },
  data () {
    return {
      e1: 1,
      alertLogin: true
    }
  },
  methods: {
    // linkTo (url) {
    //   console.log('linkto: ' + url)
    //   this.$router.push({path: url})
    // },
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
    ]),
    parrentPage (){
      if(this.$store.getters.title == 'รายการคอร์ส' || this.$store.getters.title == 'คอร์สของฉัน' || this.$store.getters.title == 'รายการโปรด' || this.$store.getters.title == 'แชท'|| this.$store.getters.title == 'โปรไฟล์' ) {
        return true
      }else{
        return false
      }
    },
    isAlertVisible () {
      if(this.parrentPage == true && this.$store.getters.isLogin == false ) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    console.log('toolbaruser: ' + JSON.stringify(this.user))
    console.log('isLogin: ' + this.$store.getters.isLogin)
    console.log('toolbar: ' + this.$store.getters.title)
  }
}
</script>
