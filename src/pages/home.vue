<template>
<div>

  <!-- <mToolbar title="รายการ"></mToolbar>       -->

  <toolbar title="รายการคอร์ส"></toolbar>
  <div v-show="$store.state.isLogin !== true">
  <v-alert
      warning
      dismissible
      hide-icon
      v-bind:value="true"
  >
      คุณยังไม่ได้ลงทะเบียนเลยนะ <v-btn primary @click.native="$router.push('/login')">ลงทะเบียน</v-btn>
  </v-alert>
</div>

    <div column v-for="(data,index) in $store.state.course" :key="index">
              <cardCourse
                @progress="checkProgress"
                :courseId="data.course_id"
                :cover="data.cover"
                :title ="data.title"
                :price="data.price"
                :lname="data.lname"
                :fname="data.fname"
                :description="data.description"
            ></cardCourse>
        </div>
      <bottomNav></bottomNav>
</div>
</template>
<script>
import cardCourse from '../components/cardCourse.vue'
export default {
  beforeCreate () {
    this.$store.dispatch('pullCourse')
  },
  components: {
    cardCourse
  },
  methods: {
    checkProgress(select) {
      console.log('select');
      this.prog = select
    }
  },
  data() {
    return {
      prog: true
    }
  },
  computed: {
    loading () {
      return this.$store.state.loading
    }
  }
}
</script>
