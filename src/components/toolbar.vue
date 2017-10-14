<template>
  <div>
    <v-toolbar dark class="primary" dense>
      <v-btn class="white--text" icon v-if="page == 'content'" @click.native="$router.push('/home')">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon class="white--text" @click.native="$router.push('/profile')">
        <v-icon>person_outline</v-icon>
      </v-btn>
      <v-btn icon class="white--text">
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  props: ['page','title']
}
</script>
