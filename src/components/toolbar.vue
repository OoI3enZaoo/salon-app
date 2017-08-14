<template>
  <div>
  <br><br>
<q-layout>
    <div slot="header" class="toolbar">
      <template v-if="icon!=null">
          <button @click="linkTo(goto)">
              <i>{{icon}}</i>
          </button>
      </template>
      <template v-if="$store.getters.isLogin">
          <button class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
              <i>menu</i>
          </button>
      </template>
      <template v-if="!$store.getters.isLogin">
          <button @click="$router.push('/')">
              <i>arrow_back</i>
          </button>

      </template>
      <q-toolbar-title :padding="1">
      {{title}}
        </q-toolbar-title>
        <template v-if="!$store.getters.isLogin">
          <button @click="$router.push('/login')" class ="faded">
            ลงชื่อเข้าใช้
          </button>
        </template>
    </div>
<template v-if="$store.getters.isLogin=true">
      <q-drawer ref="leftDrawer">
        <div class="toolbar light">
          <q-toolbar-title>
              <div class="text-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png" width="80px"><br>
                    <p class="text-primary" style="display:inline;">{{user.name}}</p><br>
                    <p class="text-black" style="display:inline;"><small>{{user.email}}</small></p>
              </div>
          </q-toolbar-title>
        </div>
        <div class="list no-border platform-delimiter">
          <q-drawer-link icon="view_quilt" to="/home" exact>
            หน้าหลัก
          </q-drawer-link>
          <q-drawer-link icon="bookmark" to="/bookmark">
            คลัง
          </q-drawer-link>
          <q-drawer-link icon="message" to="/message">
            กล่องข้อความ
          </q-drawer-link>
          <q-drawer-link icon="account_box" to="/account">
            โปรไฟล์
          </q-drawer-link>
          <hr>
          <div class="list-label">อื่นๆ</div>
          <q-drawer-link  to="/setting">
            ช่วยเหลือ
          </q-drawer-link>
          <q-drawer-link  to="/setting">
            เกี่ยวกับเรา
          </q-drawer-link>
          <q-drawer-link  to="/setting">
            ตั้งค่า
          </q-drawer-link>
          <div @click.capture="signout">
              <q-drawer-link  :to="{exact: true}">
                ออกจากระบบ
              </q-drawer-link>
          </div>
        </div>
      </q-drawer>
    </template>

<hr width="1" size="500">

</q-layout>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: ['title', 'icon', 'goto'],
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
  }
}
</script>
