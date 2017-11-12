<template>
  <div>
    <toolbar v-if="$store.state.isLogin == true" title="บัญชีของฉัน" :back="false"></toolbar>
    <toolbar v-else title="รายการคอร์ส" :back="true" link="/"></toolbar>
    <v-card color="blue white--text"v-if="$store.state.isLogin !== true">
      <v-card-text>
        สมัครสมาชิก เพื่อทำการซื้อคอร์สได้เลย <br>
        <v-btn color="white" @click.native="$router.push('/login/profile')">เข้าสู่ระบบ</v-btn>
        <v-btn color="primary" @click.native="$router.push('/register/profile')" >สมัครสมาชิก</v-btn>
      </v-card-text>
    </v-card>
      <v-container>
        <h3>hello</h3>
        <v-btn error @click.native="logout">ลงชื่อออก</v-btn>
      </v-container>






        <bottomNav></bottomNav>

  </div>
</template>
<script>
export default {
    created() {
      console.log('params: ' + JSON.stringify(this.$route.params));
    },
    methods: {
      logout () {
        this.$store.commit('isLogin',false)
        this.$router.push('/')
      }
    }
}
</script>
