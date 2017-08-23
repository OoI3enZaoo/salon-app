<template>
  <div>


    <!-- <ul  v-for="item in courseRef">
       <li>{{ item.name }}</li>
     </ul> -->



  <!-- {{courseRef}} -->
    <q-card>
      <q-card-media>
        <q-video src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0" style="height:250px;" />
      </q-card-media>
      <q-card-title>
        <div class="text-grey-9" >{{content.name}}</div>
          <span slot="subtitle">{{content.author}}</span>
          <span slot="right" class="row items-center">
              <q-btn class="bg-primary text-white" @click="buyCourse(content['.key'],content.name)">ซื้อตอนนี้</q-btn>
          </span>
      </q-card-title>
    </q-card>
    <q-card>
      <q-card-title>
        <p>เนื้อหาของคอร์ส</p>
      </q-card-title>
      <q-card-main>
            <p v-html="content.description"></p>
      </q-card-main>
    </q-card>


  </div>
</template>
<script>
import {
  QCard,
  QCardTitle,
  QCardMain,
  QCardMedia,
  QVideo,
  QBtn,
  Dialog
} from 'quasar'

import { db } from '../../firebase'
export default {
  firebase() {
    return {
        userDB: db.ref('users/'+this.$store.getters.user.key+'/course')
    }
  },
  beforeCreate() {
    navigator.vibrate(50)
  },
  created () {
    this.$bindAsObject('content',  db.ref('courses').child(this.$route.params.id))
    // this.$store.commit('findCourse', this.$route.params.id)
    // this.data = this.$store.getters.course
    // console.log('data: ' + JSON.stringify(this.data.name))

    // console.log("ref: " +this.$firebaseRefs.courseRef);
    // this.axios.get('https://salon-b177d.firebaseio.com/courses/'+this.$route.params.id + "/lessons.json")
    // .then(res =>  {
    //   let result = res.data
    //   var arr = Object.values(result)
    //   arr.forEach(res=>{
    //     console.log(res)
    //     this.lesson.push(res)
    //   })
    // })


      // courseRef.on('child_added', snapshot=> {
      //   console.log('key: ' + snapshot.key)
      //   let data = snapshot.val()
      //   data.key = snapshot.key
      //   console.log('data: ' + JSON.stringify(data))
      //   this.lesson.push(data)
      // })

      // Object.keys(result).map((data,index) => {
      //   console.log('data.key: ' + data)
      // })
      // for(let key in result){
      //   console.log(result[key])
      // }
  },
  watch: {
    content: function(val) {
      console.log(val)
      this.$store.commit('setTitle', val.name)
    }
  },
  components: {
    QCard,
    QCardTitle,
    QCardMain,
    QCardMedia,
    QVideo,
    QBtn

  },
  data () {
    return {
      data: {},
      lesson: [],
      content: {}
    }
  },
  methods: {
    doSomething(data) {
        console.log(JSON.stringify(data))
        this.$firebaseRefs.courseRef.child(data['.key']).remove()
    },
    buyCourse(key,name) {
      // console.log(  this.$firebaseRefs.userDB.child('course').child(key));
      db.ref('users').child(this.$store.getters.user.key).child('course').push({courseId: key})
      this.$store.commit('addMyCourse',key)

      // Dialog.create({
      //   title: name,
      //   message: 'คุณแน่ใจใช่หรือไม่ที่ต้องการจะซื้อคอร์สดังกล่าว',
      //   buttons: [
      //     {
      //       label: 'ไม่แน่ใจ',
      //       handler () {
      //
      //       }
      //     },
      //     {
      //       label: 'แน่ใจ',
      //       handler () {
      //         console.log('ahree');
      //         db.ref('users/'+this.$store.getters.user.key+'/course').push({courseId: key})
      //       }
      //     }
      //   ]
      // })
    }
  }
}
</script>
