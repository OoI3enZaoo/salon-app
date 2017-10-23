<template>
  <div>
    <toolbar :title="course.title" link="/home"></toolbar>
            <q-card>
              <q-video :src="course.youtube" style="height:300px;" />
                  <q-card-title>
                    <div class="row">
                      <div class="col-8">
                        <div class="headline">{{course.title}}</div>
                          <p class="text-faded">{{course.fname}} {{course.lname}}</p>
                      </div>
                      <div class="col-2">
                        <template v-if="purchaseCourse">
                          <v-btn primary slot="right" @click.native="CourseInfo(course.course_id)">รายละเอียด</v-btn>
                        </template>
                        <template v-else>
                          <v-btn primary slot="right" @click.native="buyCourse">ซื้อตอนนี้</v-btn>
                        </template>
                      </div>
                    </div>
                  </q-card-title>
                  <q-card-actions>
                    <v-spacer></v-spacer>
                  </q-card-actions>
                  <hr>
                  <q-card-main>
                     <div class="headline">รายละเอียดคอร์ส</div>
                       <p v-html="course.description"></p>
                  </q-card-main>
            </q-card>
  </div>
</template>
<script>
import {
  QCardTitle,
  QVideo,
  QCard,
  QCardActions,
  QCardMedia,
  QCardMain,
  QIcon
} from 'quasar'
export default {
  beforeCreate() {
    navigator.vibrate(50)
    this.$store.dispatch('addCourseView', this.$route.params.id)
  },
  components: {
    QCardTitle,
    QVideo,
    QCard,
    QCardActions,
    QCardMedia,
    QCardMain,
    QIcon
  },
  data () {
    return {
      data: {},
      lesson: []
    }
  },
  mounted() {
    document.addEventListener("deviceready", this.onDeviceReady, false);
  },
  methods: {
    buyCourse () {
      if (!this.CreditCard) {
        this.showAlert()
      } else {
        const data = {
          course_id: this.course.course_id,
          price: this.course.price
        }
        this.$store.dispatch('purchaseCourse', data)
        this.$store.dispatch('pullLesson', this.course.course_id)
      }
    },
    showAlert () {
      navigator.notification.confirm(
          'คุณยังไม่มีบัตรเดบิต/เครดิต ในระบบ', // message
           this.onConfirm,            // callback to invoke with index of button pressed
          'Game Over',           // title
          ['เพิ่มบัตร','ปิด']     // buttonLabels
      );
    },
    onConfirm (buttonIndex) {
      if (buttonIndex == 1) {
        this.$router.push('/payment')
      }
    },
    onDeviceReady () {
    },
    CourseInfo (course_id) {
      console.log('course_id: ' + course_id)
      this.$router.push('/lessonList/' + course_id)
    }
  },
  computed: {
    course () {
      return this.$store.getters.course_from_course_id(this.$route.params.id)[0]
    },
    purchaseCourse () {
      return this.$store.getters.course_purchase_from_course_id(this.$route.params.id)[0] !== undefined ? true : false
    },
    CreditCard () {
      return this.$store.state.creditCard
    }
  }
}
</script>
