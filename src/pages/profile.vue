<template>
  <div>
      <v-container>
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png" width="80px"><br>
              <p class="text-primary" style="display:inline;">{{$store.getters.user.name}}</p><br>
              <p class="text-black" style="display:inline;"><small>{{$store.getters.user.email}}</small></p><br><br>
              <hr>
        </div>
        <v-btn error @click.native="logout">ลงชื่อออก</v-btn>
      </v-container>
        <bottomNav></bottomNav> 
  </div>
</template>
<script>
export default {
    beforeCreate () {
      this.$store.commit('setTitle','โปรไฟล์')
    },
    methods: {
      logout () {
        this.$store.commit('isLogin',false)
        this.$router.push('/')
      }
    }
}
</script>
