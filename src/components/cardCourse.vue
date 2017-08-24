<template>
             <v-card>
               <router-link :to="'/courseContent/'+id">
                  <div class="row">
                    <div class="col-8">
                         <v-card-title>
                            <div>
                                <h6><b>{{name}}</b></h6>
                                <span>{{snippet}}</span>
                            </div>
                         </v-card-title>
                    </div>
                    <div class="col-4">
                      <v-card-media :src="cover" height="100px"></v-card-media>
                    </div>
                  </div>
                </router-link>
             </v-card>
           </template>
<script>

export default {
  props: ['id','cover','name','price','snippet','index','length'],
  created () {
    let srIndex = this.index+1
    console.log('index: ' + srIndex + ' length: ' + this.length)
    srIndex === this.length ? this.$emit('progress',false) : ''

  }
}
</script>
