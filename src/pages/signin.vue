<template>

  <div class ="layout-padding">
      <br><br><br>
      <div class="text-center">
          <h5>ยินดีต้อนรับกลับมา</h5>
          <p>กรอกอีเมลและรหัสผ่านเพื่อเข้าสู่ระบบ</p>
          <br><br><br><br><br>
         <br>
         <div class="floating-label">
            <input type="email" required class="full-width">
            <label>อีเมล</label>
        </div>
        <br>
        <div class="floating-label">
           <input type="password" required class="full-width">
           <label>รหัสผ่าน</label>
       </div>
       <br> <br>
      </div>
      <div class="text-right">
          <button class ="primary" @click="$router.push('/home')">เข้าสู่ระบบ</button>
      </div>
  </div>
</template>
<script>
export default {
}
</script>
