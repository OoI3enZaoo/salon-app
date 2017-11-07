<template>
  <div>
    <v-navigation-drawer v-model="drawer" app floating>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="" router :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>reply</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title @click="logout">ลงชื่อออก</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <span v-if="$store.state.isLogin == true">
        <v-toolbar-side-icon v-if="$route.path == '/home' || $route.path == '/coursePurchase' || $route.path == '/favorite'  || $route.path == '/profile'"dark @click.native.stop="drawer = !drawer" ></v-toolbar-side-icon>
      </span>
      <v-btn class="white--text" icon v-if="back" router :to="link">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>

    </v-toolbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      drawer: false,
      items: [
        { title: 'ส่งข้อความ', icon: 'message', link: "/message"},
        { title: 'เพิ่มบัตรเดบิต/เครดิต', icon: 'payment', link: "/payment"},
        { title: 'การตั้งค่า', icon: 'settings', link: '/setting'},
        { title: 'ความช่วยเหลือและความคิดเห็น', icon: 'help', link: '/help'}
      ]
    }
  },
  methods: {
    logout () {
      this.$store.commit('Logout')
    }
  },
  props: {
    back: {
      default: true,
      type: Boolean
    },
    title: {
      type: String
    },
    link: {
      type: String
    }
  }
}
</script>
