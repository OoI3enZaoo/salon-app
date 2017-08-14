<template>
  <div>
    <template v-if="introduce">
      <q-tabs slot="navigation" class = "fixed-bottom bg-primary text-light-blue-1">
         <q-tab route="/home" replace>หน้าหลัก</q-tab>
         <q-tab route="/login" replace>เข้าสู่ระบบ</q-tab>
       </q-tabs>
    </template>
    <template v-else>
        <q-tabs slot="navigation" class = "fixed-bottom bg-primary text-light-blue-1">
           <q-tab @slide icon="home" route="/home" exact replace>หน้าหลัก</q-tab>
           <q-tab @slide icon="bookmark" route="/bookmark" replace>ที่บันทึกไว้</q-tab>
           <q-tab @slide icon="message" route="/message" replace>กล่องข้อความ</q-tab>
           <q-tab @slide icon="account_box" route="/account" replace>โพรไฟล์</q-tab>
         </q-tabs>
    </template>
  </div>
</template>
<script>
export default {
  props: ['introduce']
}
</script>
