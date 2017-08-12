<template>
  <div>

    <div slot="header" class="toolbar">
      <button class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
        <i>menu</i>
      </button>
      <q-toolbar-title :padding="1">
        {{this.$store.getters.titleName }}
      </q-toolbar-title>
      <button @click="$refs.rightDrawer.open()">
        <i>assignment</i>
      </button>
    </div>

  </div>
</template>
<script>
export default {

  data: () => ({

  })
}
</script>
