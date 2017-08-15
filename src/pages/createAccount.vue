<template>
  <div class ="layout-padding">
      <div class="text-center">
          <h6>สร้างแอดเคาท์ใหม่</h6>
          <br><br>
          <div class="floating-label">
             <input required class="full-width" v-model="user.name" autofocus>
             <label>ชื่อ-นามสกุล</label>
         </div>
         <br><br>
         <div class="floating-label">
            <input type="email" required class="full-width" v-model="user.email">
            <label>อีเมล</label>
        </div>
        <br><br>
        <div class="floating-label">
           <input type="password" required class="full-width" v-model="user.password">
           <label>รหัสผ่าน</label>
       </div>
       <br> <br>
      </div>
      <div class="row">
            <div class="auto">
              <div class="text-left">
                  <p>คุณมีแอดเคาท์อยู่แล้วหรือเปล่า?</p>
                  <router-link to="/signin">เข้าสู่ระบบ</router-link>
              </div>
            </div>
            <div class="auto">
              <div class="text-right">
                  <button class ="primary" @click="signup">สร้างแอดเคาท์</button>
              </div>
            </div>

     </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signup () {
      console.log('user: ' + JSON.stringify(this.user))
      this.$store.dispatch('signUserUp', this.user)
    }
  }
}
</script>
