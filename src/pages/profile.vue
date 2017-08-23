<template>
  <div>
      <v-container>
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png" width="80px"><br>
              <p class="text-primary" style="display:inline;">{{$store.getters.user.name}}</p><br>
              <p class="text-black" style="display:inline;"><small>{{$store.getters.user.email}}</small></p><br><br>
              <hr>
        </div>
      </v-container>
  </div>
</template>
<script>
export default {
    beforeCreate () {
      this.$store.commit('setTitle','โปรไฟล์')
    }
}
</script>
