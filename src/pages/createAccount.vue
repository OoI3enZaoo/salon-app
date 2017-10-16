<template >
  <div>


    <toolbar  title="สมัครสมาชิก" link="/login"></toolbar>
    <v-container grid-list-lg>
      <div class="row md-gutter">
        <div class="col-12">
          <div class="text-xs-center">
            <br>
            <h5>สร้างแอดเคาท์ใหม่</h5>
            <h6>สร้างแอดเคาท์ของคุณ แล้วไปเลือกคอร์สกันเลย</h6>
            <br>
            <v-text-field
                label="อีเมล"
                  v-model="email"
            ></v-text-field>
            <v-text-field
                label="รหัสผ่าน"
                v-model="user.password"
            ></v-text-field>
            <div class="row md-gutter">
              <div class="col-6">
                <v-text-field
                    label="ชื่อจริง"
                    v-model="user.fname"
                ></v-text-field>
              </div>
              <div class="col-6">
                <v-text-field
                    label="นามสกุล"
                    v-model="user.lname"
                ></v-text-field>
              </div>
            </div>
            <div class="row md-gutter">
              <div class="col-6">
                <v-text-field
                  type="number"
                  label="เบอร์มือถือ"
                  v-model="user.phone"
                ></v-text-field>
              </div>
              <div class="col-6">
                  <base64upload imageSrc="http://findicons.com/files/icons/1580/devine_icons_part_2/256/account_and_control.png" @change="onChangeImage" style="width:70px; ">
                    <slot name="name">sds</slot>
                  </base64upload>
              </div>
            </div>

            <v-slider
                  color="orange"
                  label="อายุ"
                  hint="ไม่หลอกกันนะ"
                  min="1"
                  max="100"
                  thumb-label
                  v-model="user.age"
                ></v-slider>

<br>

            <v-btn block primary round large @click.native="signup">ลงทะเบียน</v-btn>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import toolbar from '../components/toolbar.vue'
import base64upload from '../components/base64upload.vue'
import Vue from 'vue'
import axios from 'axios'
const moment = require('moment')
Vue.use(require('vue-moment'), {
    moment
})
export default {
  components: {
    toolbar,
    base64upload
  },
  data () {
    return {
      email: '',
      user: {
        password: '',
        fname: '',
        lname: '',
        avatar: '',
        age: '',
        phone: '',
        tstamp: ''
      }
    }
  },
  methods: {
    signup () {
      this.user.email = this.email
      console.log('user: ' + JSON.stringify(this.user))
        this.user.user_id = (new Date().getTime())
        this.user.tstamp = Vue.moment().format('YYYY-MM-DD HH:mm:ss')
        axios.post('http://localhost:4000/api/insertuser', this.user)
        this.$store.commit('addUserProfile', this.user)
        this.$store.commit('isLogin', true)
        this.$router.push('/home')
    },
    onChangeImage (data) {
      this.user.avatar =  'data:image/jpeg;base64,' + data.base64
    }
  }
}
</script>
