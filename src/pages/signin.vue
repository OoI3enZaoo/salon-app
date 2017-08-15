<template>

  <div class ="layout-padding">
      <br><br><br>
      <div class="text-center">
          <h5>ยินดีต้อนรับกลับมา</h5>
          <p>กรอกอีเมลและรหัสผ่านเพื่อเข้าสู่ระบบ</p>
          <br><br><br><br><br>
         <br>
         <div class="floating-label">
            <input type="email" required class="full-width" v-model="user.email" autofocus>
            <label>อีเมล</label>
        </div>
        <br><br>
        <div class="floating-label">
           <input type="password" required class="full-width" v-model="user.password">
           <label>รหัสผ่าน</label>
       </div>
       <br> <br>
      </div>
      <div class="text-right">
          <button class ="primary" @click="login">เข้าสู่ระบบ</button>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('signUserIn', this.user)
      // router.push('/home')
    }
  }
}
</script>
