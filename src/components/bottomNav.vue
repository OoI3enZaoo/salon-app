<template>
  <div>
    <br><br><br>
    <v-bottom-nav :value="true" class="white " :active.sync="e1">
      <v-btn flat color="primary" value="home" router to="/home">
        <span>บ้าน</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn flat color="primary" value="coursePurchase" router to="/coursePurchase">
        <span>คอร์สของฉัน</span>
        <v-icon>bookmark</v-icon>
      </v-btn>
      <v-btn flat color="primary" value="favorite" router to="/favorite">
        <span>รายการโปรด</span>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn flat color="primary" value="message" router to="/message">
        <span>ข้อความ</span>
        <v-icon>message</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        e1: 'home'
      }
    },
    methods: {
      linkTo (el,link) {
        console.log('linkto: el: ' + el + " link: " + link);
         this.e1 = el
         this.$router.push(link)
      },
    }
  }
</script>
