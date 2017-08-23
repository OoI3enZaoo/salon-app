<template>
  <div class ="layout-padding">
    <br><br><br><br><br><br>
    <button class ="light full-width"@click="$router.push('/signin')"><i>home</i>เข้าสู่ระบบโดยใช้ Email</button>
    <br><br><br><br><br><br>
    <button class ="light full-width"><i>home</i>เข้าสู่ระบบโดยใช้ Google</button>
    <br><br>
    <button class ="light full-width"><i>home</i>เข้าสู่ระบบโดยใช้ Facebook</button>
    <br><br><br>
    <div class="text-center">
        คุณเพึ่งมาใหม่หรือเปล่า?  &nbsp;<router-link to="/createAccount">สร้างแอดเคาท์เลย</router-link>
    </div>
  </div>
</template>
<script>
export default {
  beforeCreate () {  
    this.$store.commit('setTitle','login')
  }
}
</script>
