<template>
<div>

    <toolbar v-if="$store.state.isLogin == true" title="รายการคอร์ส" :back="false"></toolbar>
    <toolbar v-else title="รายการคอร์ส":back="false" ></toolbar>


<v-card color="blue white--text"v-if="$store.state.isLogin !== true">
  <v-card-text>
    สมัครสมาชิก เพื่อเลือกซื้อคอร์สเลย <br>
    <v-btn color="white" @click.native="$router.push('/login/home')">เข้าสู่ระบบ</v-btn>
    <v-btn color="primary" @click.native="$router.push('/register/home')" >สมัครสมาชิก</v-btn>
  </v-card-text>
</v-card>

<br><br>
<q-pull-to-refresh :handler="refresher" pull-message = "" release-message="ปล่อยมือเพื่อโหลด" refresh-message="โหลดข้อมูล" >
   <div column v-for="(data, index) in course" :key="index">
             <cardCourse
               :data="data"
           ></cardCourse>
   </div>
   <div style="height:50px;"></div>

</q-pull-to-refresh>

<v-snackbar
     :color="snackbar.color"
     v-model="snackbar.model"
   >
     {{ snackbar.text }}
     <v-btn dark flat @click.native="snackbar = false">ปิด</v-btn>
   </v-snackbar>

<v-dialog v-model="dialog"  max-width="300px">
      <v-card>
        <v-card-title class="headline">คุณได้ทำการแนะนำคอร์สให้ผู้อื่น</v-card-title>
        <v-card-text>กรอกข้อมูลบัญชีเพื่อรับค่าตอบแทนจากแอดมิน</v-card-text>
        <v-card-text>
          <v-text-field label="ชื่อธนาคาร" v-model="bank.bankName"></v-text-field>
          <v-text-field type="number" label="เลขบัญชี"  v-model="bank.bankAccount"></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click.native="dialogClose">ปิด</v-btn>
          <v-btn color="blue darken-1" flat :disabled="!isDialogValid" @click.native="dialogSave">บันทึก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

      <bottomNav></bottomNav>
</div>
</template>
<script>
import {
  QPullToRefresh,
  Toast
} from 'quasar'
import cardCourse from '../components/cardCourse.vue'
import last from '../components/course/last.vue'
import popular from '../components/course/popular.vue'
import price from '../components/course/price.vue'
import Vue from 'vue'
export default {
  components: {
    cardCourse,
    QPullToRefresh,
    Toast,
    last,
    popular,
    price
  },
  methods: {
    checkProgress(select) {
      console.log('select');
      this.prog = select
    },
    refresher (done) {
      this.$store.dispatch('refreshCourse')
      done()
    },
    dialogClose () {
      this.dialog = false
      this.snackbar.text = "สามารถเข้าไปกรอกข้อมูลใหม่ได้ที่แถบ 'บัญชีของฉัน'"
      this.snackbar.model = true
    },
    dialogSave () {
      this.dialog = false
      this.snackbar.text = "สามารถเข้าไปแก้ไขข้อมูลได้ที่แถบ 'บัญชีของฉัน'"
      this.snackbar.color = "success"
      this.snackbar.model = true
      this.$store.dispatch('saveBankAccount', this.bank)
    }
  },
  watch: {
    bankStatus: function (status) {
      console.log('status: ' + status);
      if (status == 1) {
        this.dialog = true
      }
    }
  },
  data() {
    return {
      prog: true,
      menuItems: [
        { title: 'ล่าสุด' },
        { title: 'ความนิยม' },
        { title: 'ราคา' },
      ],
      dialog: false,
      snackbar: {
        model: false,
        color: 'primary',
        text: ''
      },
      bank: {
        bankName: '',
        bankAccount: ''
      }
    }
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    course () {
      return this.$store.state.course
    },
    isDialogValid () {
      return this.bank.bankName !== '' && this.bank.bankAccount !== ''
    },
    bankStatus () {
      return this.$store.state.profile.bankStatus
    }
  }
}
</script>
