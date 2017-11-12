<template>
  <div>
    <toolbar :title="course.title" link="/home"></toolbar>
            <v-card class="elevation-0">
              <d-player :video="{url : 'http://172.104.189.169:4300/api/getfile/' + course.video, pic: course.cover}"
                            :contextmenu="contextmenu"
                            :screenshot="true"
                            ref="player">
                  </d-player>
              <v-card-actions>
                <v-icon>remove_red_eye</v-icon>&nbsp; <span>{{course.view}}</span> &nbsp;&nbsp;
                <v-icon>shopping_cart</v-icon>&nbsp; <span>{{course.purchase}}</span> &nbsp;&nbsp;
                <v-icon>fa-money</v-icon> <span><b>THB{{course.price}}</b></span>
                <v-spacer></v-spacer>
                <span>
                  <v-avatar size="25px">
                    <img :src="course.avatar">
                  </v-avatar>
                  {{course.fname}} {{course.lname}}
                </span>
              </v-card-actions>
              <q-card-separator />
              <v-card-title>
                <span class="headline">{{course.title}}</span>
              </v-card-title>
              <v-card-text>
                 <p v-html="course.description"></p>
              </v-card-text>
            </v-card>
            <v-card class="elevation-0" style="background-color:#EEEEEE;">
                <v-card-text>
                  <template v-if="purchaseCourse">
                    <v-btn primary block @click.native="CourseInfo(course.course_id)">หน้าจัดการคอร์ส</v-btn>
                  </template>
                  <template v-else-if="!purchaseCourse && $store.state.isLogin == true">
                    <div class="form">
                        <form ref="omiseform" name="checkoutForm" method="POST" :action="'http://localhost:4000/api/checkout/' + course.course_id +'/' + $store.state.profile.user_id">
                         <!-- <v-btn type="submit">submitsubmit</v-btn> -->
                        <v-btn primary block class="checkout-button-1" type="submit" id="checkout-button-1" ref="cbutton1"><v-icon dark>shopping_cart</v-icon>&nbsp;ซื้อตอนนี้</v-btn>
                      </form>
                    </div>
                  </template>
                  <template v-else-if="$store.state.isLogin == false">
                    <v-card>
                      <v-card-text>เฉพาะสมาชิกเท่านั้น</v-card-text>
                    </v-card>
                  </template>
              </v-card-text>
            </v-card>

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
  QIcon,
  QCardSeparator
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
    QIcon,
    QCardSeparator
  },
  data () {
    return {
      data: {},
      lesson: [],
      contextmenu: [
          {
              text: 'GitHub',
              link: 'https://github.com/MoePlayer/vue-dplayer'
          }
      ]
    }
  },
  watch: {
    allcourse: function (val) {
      console.log("COURSE: " + val );
      let user_id = this.$route.params.user_id
      let course_id = this.$route.params.id
      if (user_id !== '0') {
        console.log('user_id ' + user_id)
        let data = {
          course_id: course_id,
          price: 200
        }

        this.$store.dispatch('purchaseCourse', data)
        this.$store.dispatch('pullLesson', course_id)

        //this.$router.push('/home')
        // console.log(this.$store.getters.course_from_course_id(this.$route.params.id)[0])
        //   this.$store.dispatch('loadFavorite', user_id)
        //   this.$store.dispatch('loadMyCourse', user_id)
        //   this.$socket.emit('subscribe', user_id)
        //   this.$store.dispatch('getLastChat', user_id)
        //   this.$store.dispatch('LoadCreditCard', user_id)

      } else {
        console.log('status == 0')
      }

    }
  },
  mounted () {
    document.addEventListener("deviceready", this.onDeviceReady, false);




    OmiseCard.configure({
      publicKey:        'pkey_test_59wttviu3e8b5dzulzp',
      amount:           500,
      currency:         'thb',
      image:           'https://cdn.omise.co/assets/dashboard/images/omise-logo.png',
      frameLabel:       'Merchant name',
      frameDescription: 'Merchant description',
      submitLabel:      'Pay',
      buttonLabel:      'Pay with Omise',
      location:         'no',
      billingName:      '',
      billingAddress:   '',
      submitFormTarget: null,
    });
      // Configuring your own custom button
      OmiseCard.configureButton('#checkout-button-1', {
        frameLabel: 'Merchant name',
        submitLabel: 'PAY RIGHT NOW !',
      });
      // Then, attach all of the config and initiate it by 'OmiseCard.attach();' method
      OmiseCard.attach();
  },
  methods: {
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
      this.$router.push('/coursePurchase/')
    }
  },
  computed: {
    allcourse () {
      return this.$store.state.course
    },
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
