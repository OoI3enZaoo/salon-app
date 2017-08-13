<template>
  <div>
    <q-tabs slot="navigation" class = "fixed-bottom bg-primary text-light-blue-1">
       <q-tab icon="home" route="/" exact replace>หน้าหลัก</q-tab>
       <q-tab icon="bookmark" route="/bookmark" replace>ที่บันทึกไว้</q-tab>
       <q-tab icon="message" route="/message" replace>กล่องข้อความ</q-tab>
       <q-tab icon="account_box" route="/account" replace>โพรไฟล์</q-tab>
     </q-tabs>
  </div>
</template>
