<template>
  <div>

    <div slot="header" class="toolbar">
      <button v-if="icon!=null" @click="linkTo(goto)">
          <i>{{icon}}</i>
      </button>
      <q-toolbar-title :padding="1">
        {{this.title }}
      </q-toolbar-title>
      <button @click="$refs.rightDrawer.open()">
        <i>assignment</i>
      </button>
    </div>

  </div>
</template>
<script>
export default {
  props: ['title', 'icon', 'goto'],
  methods: {
    linkTo (url) {
      console.log('linkto: ' + url)
      this.$router.push({path: url})
    }
  }
}
</script>
