<template>
  <div>
    <mToolbar :title="data.name" icon= "arrow_back" goto="/home"></mToolbar>
      <div class="card">
        <q-video
          src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"
        ><div slot="loading">Loading...</div></q-video>
        <div class="card-content">
          <span class="text-grey-8" style="font-size:small;">{{data.author}}</span>
          <div class="text-grey-9" >{{data.name}}</div>
          <div class="row">
              <div class="text-black width-1of5"  style="font-size:large; margin-top:8px">
                <b>THB{{data.price}}</b>
              </div>
              <button class ="primary pull-right offset-1of2">ซื้อตอนนี้</button>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="caption">
              <p>เนื้อหาของคอร์ส</p>
              <p v-html="data.description"></p>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  created () {
    this.$store.commit('findCourse', this.$route.params.id)
    this.data = this.$store.getters.course
    console.log('data: ' + JSON.stringify(this.data.name))
    this.$store.commit('setTitle', this.data.name)
  },
  data () {
    return {
      data: {}
    }
  }
}
</script>
