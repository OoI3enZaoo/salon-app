<template >
  <div>


    <toolbar  title="เข้าสู่ระบบ" :link="'/' + this.$route.params.link"></toolbar>
    <v-container grid-list-lg>
      <div class="row md-gutter">
        <div class="col-12">
          <div class="text-xs-center">
            <br>
            <h5>ยินดีต้อนรับกลับมา</h5>
            <h6>กรอกข้อมูลให้ครบถ้วนแล้วไปเลือกคอร์สกันเลย</h6>
            <br>
            <v-text-field
                label="อีเมล"
                  v-model="email"
            ></v-text-field>
            <v-text-field
              type="password"
                label="รหัสผ่าน"
                  v-model="password"
            ></v-text-field>

<br>
            <v-btn block primary round large :disabled ="!isValid" @click.native="login">เข้าสู่ระบบ</v-btn>
            <!-- <p color="blue">ยังไม่ได้เป็นสมาชิก? <router-link to="/register/login/home">สมัครสมาชิก</router-link></p> -->
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import toolbar from '../components/toolbar.vue'
import base64upload from '../components/base64upload.vue'
import axios from 'axios'
export default {
  components: {
    toolbar,
    base64upload
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      console.log('login');
      let user_id = null
      await axios.get('http://172.104.189.169:4100/api/checkloginuser/'+ this.email + '/' + this.password)
      .then (res => {
        let result = res.data[0]
        if (result.check_user == 1) {
          user_id = result.user_id
        } else {
          window.alert('รหัสผิดพลาด')
        }
      })
      if (user_id !== null) {
        axios.get('http://172.104.189.169:4100/api/getuserdata/' + user_id)
        .then (res => {
          let result = res.data
          this.$store.commit('isLogin', true)
          this.$store.dispatch('pullCourse')
          this.$store.commit('addUserProfile', result[0])
          this.$store.dispatch('loadFavorite', user_id)
          this.$store.dispatch('loadLessonFromUserId', user_id)
          this.$socket.emit('subscribe', user_id)
          this.$store.dispatch('getLastChat', user_id)
          this.$router.push('/home')
        })
      }
    }
  },
  computed: {
    isValid () {
      return this.email !== '' && this.password !== ''
    }
  }
}
</script>
