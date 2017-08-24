<template>
  <div>
            <v-card>
              <q-video src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0" style="height:250px;" />
                  <v-card-title>
                    <div class="headline">{{content.name}}</div>
                      <div class="grey--text">{{content.author }}</div>
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn primary>ซื้อตอนนี้</v-btn>
                  </v-card-actions>
                  <hr>
                  <v-card-text>
                     <div class="headline">รายละเอียดคอร์ส</div>
                       <p v-html="content.description"></p>
                  </v-card-text>
            </v-card>


  </div>
</template>
<script>
import { db } from '../../firebase'
import { QVideo } from 'quasar'
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
    QVideo
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
